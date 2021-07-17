const router = require('express').Router()
const UserController = require('../controllers/users.controller')

router.post('/register', UserController.registerUser)
router.post('/login/password', UserController.loginUserWithPassword)
router.post('/login/otp', UserController.loginUserWithOtp)
router.post('/login/verifyotp', UserController.verifyOtp)

module.exports = router
