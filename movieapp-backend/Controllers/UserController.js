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

    if(!isMatch || !user){
        return res.json({
            error: "Invalid Credentials!"
        })
    }

     if(isMatch){
        const token = jwt.sign({
            userId: user._id,
            fullName: user.fullName,
            Email: user.Email
        }, process.env.JWT_SECRET)

        return res.json({token})
     }
}

const getUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.json({
                error: "No Token Provided!"
            })
        }

        const token = authHeader.split(' ')[1]
        if(!token){
            return res.json({
                error: "Invalid Token!"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
            if(err) throw err

            return res.json(user)
        })
    } catch (error) {
        return res.json({
            error: "An Error Occured!", error
        })
    }
};

const DeleteUser = async (req,res)=>{
    try {
        
        const {userId} = req.body

        if(!userId){
            return res.json({
                error: "No User Found!"
            })
        }

        const deletedUser = await userModel.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.json({
                error: "User Does not Exist!"
            })
        }

        return res.json({
            message: "User Deleted Successfully!",
            user: deletedUser
        })

    } catch (error) {
        console.log("An Error Occured!", error)
        return res.json({
            error: "An Error Occured!"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    DeleteUser
};