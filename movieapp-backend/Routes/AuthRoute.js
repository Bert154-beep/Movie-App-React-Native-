const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser} = require('../Controllers/UserController')
const {AuthMiddleware} = require('../Middleware/AuthMiddleware')

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/getUser', AuthMiddleware, getUser)


module.exports = router;