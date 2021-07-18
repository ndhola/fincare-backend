const nodemailer = require('nodemailer')

const sendOtpToEmail = (email, otp, subject, msg) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sunnymakadia1@gmail.com',
      pass: 'qwaszx!@7',
    },
  })

  let mailOptions = {
    from: '"FinCare" sunnymakadia1@gmail.com',
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

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

module.exports = { sendOtpToEmail, generateOtp }