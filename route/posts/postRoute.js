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
    deletePost,
    toggleAddLikeToPost,
    toggleAddDislikeToPost,
    searchPosts

} = require('../../controllers/posts/postControl')


//CREATE POST
router.post('/create', protected, postPhotoUploadMiddleware.single("image"), postPhotoResize, createPost)

//FETCH ALL POSTS
router.get('/', fetchAllPosts)

//LIKE POST
router.put('/like', protected, toggleAddLikeToPost)

//LIKE POST
router.put('/dislike', protected, toggleAddDislikeToPost)

//SEARCH POST
router.get('/search', searchPosts)

//FETCH SIGLE POST DETAILS
router.get('/:id', fetchPostDetails)

//UPDATE POST
router.put('/:id', protected, updatePost)

//DELETE POST
router.delete('/:id', protected, deletePost)



module.exports = router