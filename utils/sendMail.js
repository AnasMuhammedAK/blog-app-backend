
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(link,email) {

    console.log(process.env.GMAIL_APP_PASSWORD, process.env.APP_GMAIL)
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

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.APP_GMAIL, // sender address
    to: 'anasabdulkareem100@gmail.com', // list of receivers
    subject: "Reset Password", // Subject line
    text: "Your Password reset link", // plain text body
    html: `<a href=${link}> Click here <a/> to reset password`, // html body
  });

 return 
}

module.exports = sendMail
