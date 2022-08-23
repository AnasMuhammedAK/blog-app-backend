const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const { 
    createPost,
    sendEmail
 } = require('../../controllers/posts/postControl')


//CREATE POST
router.post('/create',protected,createPost)

//SEND EMAIL
router.post('/sms',sendEmail)





module.exports = router