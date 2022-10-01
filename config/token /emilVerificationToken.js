const crypto = require("crypto");
// verify account with email
 const generateAccountVerificationToken = async () => {
    //create token
    console.log("verification token created")
    const verificationToken = crypto.randomBytes(32).toString("hex")
    accountVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
    accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000 //10 minutes
    return {  verificationToken, accountVerificationToken, accountVerificationTokenExpires}
}
module.exports = generateAccountVerificationToken