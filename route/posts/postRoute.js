const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const {
    postPhotoUploadMiddleware,
    postPhotoResize
} = require('../../middlewares/imageUploads/uploadPhoto.js')
const { 
    createPost,
    fetchAllPosts,
    fetchPostDetails,
    updatePost,
    deletePost
 } = require('../../controllers/posts/postControl')


//CREATE POST
router.post('/create',protected,postPhotoUploadMiddleware.single("image"),postPhotoResize,createPost)

//FETCH ALL POSTS
router.get('/',fetchAllPosts)

//FETCH SIGLE POST DETAILS
router.get('/:id',fetchPostDetails)

//UPDATE POST
router.put('/:id',protected,updatePost)

//DELETE POST
router.delete('/:id',protected,deletePost)



module.exports = router