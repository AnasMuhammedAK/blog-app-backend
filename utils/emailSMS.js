
const nodemailer = require("nodemailer")

async function emailSMS(to,from,subject,message) {

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

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.APP_GMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: "Hello", // plain text body
        html: `<h2>Hello, This Email From SpeedCode Website</h2> <h3>Subject : ${subject}</h3> <h4>Message : ${message}</h4> <h5>Send By : ${from}</h5>`, // html body
    });
    if(info) console.log('email sending done')
    return 
}

module.exports = emailSMS