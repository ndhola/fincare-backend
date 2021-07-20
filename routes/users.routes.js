const router = require('express').Router()
const UserController = require('../controllers/users.controller')
const protect = require('../middlewares/auth')

router.post('/register', UserController.registerUser)
router.post('/login/password', UserController.loginUserWithPassword)
router.post('/login/otp', UserController.loginUserWithOtp)
router.post('/login/verifyotp', UserController.verifyOtp)
router.post('/forgotpassword/otp', UserController.forgotPasswrdSendOtp)
router.post('/forgotpassword/verifyotp', UserController.verifyOtp)
router.post('/forgotpassword/passwordReset', UserController.forgotPasswrdReset)
router.post('/token', protect, UserController.token)

module.exports = router
