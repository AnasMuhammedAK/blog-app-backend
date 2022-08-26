const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const {
    postPhotoUploadMiddleware,
    postPhotoResize
} = require('../../middlewares/imageUploads/uploadPhoto.js')
const { 
    createPost,
    sendEmail
 } = require('../../controllers/posts/postControl')


//CREATE POST
router.post('/create',protected,postPhotoUploadMiddleware.single("image"),postPhotoResize,createPost)

//SEND EMAIL
router.post('/sms',sendEmail)





module.exports = router