const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUser, DeleteUser} = require('../Controllers/UserController')
const {AuthMiddleware} = require('../Middleware/AuthMiddleware')

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/getUser', AuthMiddleware, getUser)
router.delete('/deleteUser', AuthMiddleware, DeleteUser)


module.exports = router;