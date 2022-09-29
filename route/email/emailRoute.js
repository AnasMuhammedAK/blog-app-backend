const express = require("express")
const { sendEmailMsg } = require("../../controllers/email/emailControl")
const protected = require("../../middlewares/auth/authMiddleware")

const emailMsgRoutes = express.Router()


emailMsgRoutes.post("/", protected, sendEmailMsg)


module.exports = emailMsgRoutes