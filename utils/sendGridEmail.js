const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendGridEmail = (to, subject, message, sendby) => {
  const msg = {
    to: "anasmon800@gmail.com", // Change to your recipient
    from: process.env.APP_GMAIL, // Change to your verified sender
    subject: subject,
    text: 'Hello',
    html: `<h3>Subject : ${subject}</h3> <h4>Message : ${message}</h4> <br> <h5>Send By : ${sendby}</h5>`,
  }
  console.log(to)
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