const asyncHandler = require('express-async-handler');
const Post = require('../../model/post/Post');
const User = require('../../model/user/User');
const validateMongodbId = require('../../utils/validateMongodbID')
const Filter = require('bad-words');
const sendGridEmail = require('../../utils/sendGridEmail');
const cloudinaryUploadImg = require('../../utils/cloudinary');


//----------------------------------------------------------------
// CREATE POST
// @route POST => /api/
//----------------------------------------------------------------
const createPost = asyncHandler(async (req , res) =>{
    const { id } = req.user
    const { title, description} = req.body
    validateMongodbId(id)
    //Check for having Bad words
    const filter = new Filter()
    const ifBadWords = filter.isProfane(title, description)
 if(ifBadWords){
    //block user Automatically
     await User.findByIdAndUpdate(id, {
        isBlocked: true
    }, { new : true})
    throw new error('Creating field and your are blocked, because you are using a bad words')
 }
  //1. Get the oath to img
  const localPath = `public/images/postPhotos/${req.file.filename}`
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath)
    try {
        const post = await Post.create({...req.body,
            image: imgUploaded.url,
            user: id
        })
        res.json(post)
    } catch (error) {
        throw new Error(error.message)
    }
})

const sendEmail = asyncHandler(async (req, res) => {
    sendGridEmail()
    res.json('Email sent')
})





module.exports = {
    createPost,
    sendEmail
}
