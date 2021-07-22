/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const nodemailer = require('nodemailer')

/**
 * Description: Function to Send OTP to specific Email address
 * @param {*} email
 * @param {*} otp
 * @param {*} subject
 * @param {*} msg
 */
const sendOtpToEmail = (email, otp, subject, msg) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fincare.noreply@gmail.com',
      pass: 'fincare4you',
    },
  })

  let mailOptions = {
    from: '"FinCare" fincare.noreply@gmail.com',
    to: email,
    subject,
    html: `
        <h3>Welcome to FinCare</h3>
        <p>Your OTP for ${msg}: <b>${otp}</b></p>
        <br />
        <br />
        <p>Security Warning: Do not share your OTP with anyone.</p>
        `,
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (!err) {
      console.log('Email sent successfully!')
    } else {
      console.error('Error: ' + err)
    }
  })
}

/**
 * Description: Function to Generate OTP
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

module.exports = { sendOtpToEmail, generateOtp }
