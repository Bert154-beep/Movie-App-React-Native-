const jwt = require('jsonwebtoken')

const AuthMiddleware = async (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token){
        return res.json({
            error: "Unauthorized!"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()

}
        
module.exports = {
    AuthMiddleware
}
