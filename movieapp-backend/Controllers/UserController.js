const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async (req,res)=>{
    const {fullName, Email, password, ConfirmPassword} = req.body

    if(!fullName || !Email || !password || !ConfirmPassword){
        return res.json({
            error: "All Fields Are Required!"
        })
    }

    if(password !== ConfirmPassword){
        return res.json({
            error: "Passwords donot Match!"
        })
    }

    const exist = await userModel.findOne({Email})

    if(exist){
        return res.json({
            error: "User Already Exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        fullName,
        Email,
        password: hashedPassword
    })

    res.json(newUser)
}

const loginUser = async (req,res)=>{
    const {Email, password} = req.body
    
    if(!Email || !password){
        return res.json({
            error: "All Fields are required!"
        })
    }

    const user = await userModel.findOne({ Email })

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.json({
            error: "Invalid Credentials!"
        })
    }

     if(isMatch){
        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            Email: user.name
        }, process.env.JWT_SECRET)

        res.json(token)
     }
}

const getUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }

            return res.json(user);
        });
    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({ error: "An error occurred" });
    }
};
const logoutUser = async (req,res)=>{
    const token = req.headers['authorization']
}

module.exports = {
    registerUser,
    loginUser,
    getUser
};