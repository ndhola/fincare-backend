/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const router = require('express').Router()
const UserController = require('../controllers/users.controller')

router.post('/register', UserController.registerUser)
router.post('/login/password', UserController.loginUserWithPassword)
router.post('/login/otp', UserController.loginUserWithOtp)
router.post('/login/verifyotp', UserController.verifyOtp)
router.post('/forgotpassword/otp', UserController.forgotPasswrdSendOtp)
router.post('/forgotpassword/verifyotp', UserController.verifyOtp)
router.post('/forgotpassword/passwordReset', UserController.forgotPasswrdReset)

module.exports = router
