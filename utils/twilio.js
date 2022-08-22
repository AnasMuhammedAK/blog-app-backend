require("dotenv").config();
//otp twilio integration-----------------------------------------
const Messaging_Service_SID = process.env.Messaging_Service_SID;
const Account_SID = process.env.Account_SID;
const Auth_Token = process.env.Auth_Token;
const OTP = require("twilio")(Account_SID, Auth_Token);

//SEND OTP
const sendOtp=(phone)=>{
    try {
        OTP.verify
        .services(Messaging_Service_SID)
        .verifications.create({
          to: `+91${phone}`,
          channel: "sms",
        })
        return
    } catch (error) {
        console.log(error);
        return
    }
}

//VERIFY OTP
const verifyOTP = (phone,otp) =>{
    
        OTP.verify
        .services(Messaging_Service_SID)
        .verificationChecks.create({
          to: `+91${phone}`,
          code: otp,
        })
        .then((response) => {
          console.log(response);
          if(response.valid){
            console.log(response.valid);
            return response
          }else{
            console.log("not valid");
            return null
          }
        })
}
module.exports = {
    sendOtp,
    verifyOTP,
}

