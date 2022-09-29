const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const EmailMsg = require("../../model/email/EmailMsg");
const emailSMS = require("../../utils/emailSMS")


const sendEmailMsg = expressAsyncHandler(async (req, res) => {
    const { to, subject, message } = req.body;
    const msg = {
        to,
        subject,
        message,
        sentBy: req?.user?._id,
    };
    //prevent profanity/bad words
    const filter = new Filter();
    // get the message
    const emailMessage = subject + " " + message;
    const isProfane = filter.isProfane(emailMessage);
    if (isProfane)
        throw new Error("Email sent failed, because it contains profane words.");
    
    try {
        //send email message
        emailSMS(to,from=req?.user?.email, subject, message)
        //save to our db
        await EmailMsg.create({
            sentBy: req?.user?._id,
            from: req?.user?.email,
            to,
            message,
            subject,
        });
    res.status(200).json("Mail sent");
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
});

module.exports = {
    sendEmailMsg,
};
