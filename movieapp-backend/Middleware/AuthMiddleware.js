const jwt = require('jsonwebtoken')

const AuthMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.json({
            error: "No Token Provided"
        })
    }

    const token = authHeader.split(' ')[1]?.trim()

    if(!token){
        return res.json({
            error: "Unauthorized!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return res.json({
                error: "Invalid Token!"
            })
        } else if(error instanceof jwt.TokenExpiredError){
            return res.json({
                error: 'Token Expired!'
            })
        }
        
    }

    next()
}

        
module.exports = {
    AuthMiddleware
}
