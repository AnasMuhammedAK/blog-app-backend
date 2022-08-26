const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendGridEmail = (to, subject,verificationToken) => {
  console.log(URL)
    const msg = {
        to: "anasmon800@gmail.com", // Change to your recipient
        from: process.env.APP_GMAIL, // Change to your verified sender
        subject: subject,
        text: 'Hello',
        html: `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify your account</a>`,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
        return
}

  module.exports = sendGridEmail