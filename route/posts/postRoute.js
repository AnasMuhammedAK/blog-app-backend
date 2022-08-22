const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const { 
    createPost,
 } = require('../../controllers/posts/postControl')


//CREATE POST
router.post('/create',protected,createPost)





module.exports = router