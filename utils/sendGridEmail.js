
const nodemailer = require("nodemailer")

async function sendMail(to,subject,URL) {
console.log(to,subject,URL)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // process.env.APP_GMAILtrue for 465, false for other ports
    auth: {
      user: process.env.APP_GMAIL, // generated ethereal user
      pass: process.env.GMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.APP_GMAIL, // sender address
    to, // list of receivers
    subject, // Subject line
    text: "Your Account verification link", // plain text body
    html: URL // html body
  });

  console.log('sending done email verification token')
 return 
}

module.exports = sendMail
