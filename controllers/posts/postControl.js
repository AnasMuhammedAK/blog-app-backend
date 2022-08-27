const asyncHandler = require('express-async-handler');
const Post = require('../../model/post/Post');
const User = require('../../model/user/User');
const validateMongodbId = require('../../utils/validateMongodbID')
const Filter = require('bad-words')
const cloudinaryUploadImg = require('../../utils/cloudinary');
const fs = require('fs')

//----------------------------------------------------------------
// CREATE POST
// @route POST => /api/posts/create
//----------------------------------------------------------------
const createPost = asyncHandler(async (req, res) => {
    const { id } = req.user
    const { title, description } = req.body
    validateMongodbId(id)
    //Check for having Bad words
    const filter = new Filter()
    const ifBadWords = filter.isProfane(title, description)
    if (ifBadWords) {
        //block user Automatically
        await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, { new: true })
        throw new error('Creating field and your are blocked, because you are using a bad words')
    }
    //1. Get the oath to img
    const localPath = `public/images/postPhotos/${req.file.filename}`
    //2.Upload to cloudinary
    const imgUploaded = await cloudinaryUploadImg(localPath)
    try {
        const post = await Post.create({
            ...req.body,
            image: imgUploaded.url,
            user: id
        })
        //remove curresponding image from our server
        fs.unlinkSync(localPath)
        res.status(200).json(post)
    } catch (error) {
        throw new Error(error.message)
    }
})

//----------------------------------------------------------------
// FETCH ALL POSTs
// @route GET => /api/posts/
//----------------------------------------------------------------
const fetchAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({}).populate("user")
        res.status(200).json(posts)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// FETCH SINGLE POST DATA
// @route GET => /api/posts/:id
//----------------------------------------------------------------
const fetchPostDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const post = await Post.findById(id).populate("user")
        if (!post) throw new Error("THis Post not found")
        //update number of views 
        await Post.findByIdAndUpdate(id,{
            $inc: { numViews: 1 }
        },{ new: true})
        res.status(200).json(post)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// UPDATE POST
// @route PUT => /api/posts/:id
//----------------------------------------------------------------
const updatePost = asyncHandler (async (req, res) => { 
    const { id } = req.params
    const userId = req.user.id
    validateMongodbId(id)
    try {
        const post = await Post.findByIdAndUpdate(id,{
            ...req.body,
            user:userId,
        }, { new: true })
        res.status(200).json(post)
    } catch (error) {
        throw new Error(error.message)
    }

})
//----------------------------------------------------------------
// DELETE POST
// @route DELETE => /api/posts/:id
//----------------------------------------------------------------
const deletePost = asyncHandler( (async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    validateMongodbId(id)
    try {
        res.status(200).json('deleted')
    } catch (error) {
        
    }
}))
module.exports = {
    createPost,
    fetchAllPosts,
    fetchPostDetails,
    updatePost,
    deletePost

}
