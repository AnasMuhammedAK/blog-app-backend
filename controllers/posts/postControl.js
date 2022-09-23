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
    //1. Get the path to img
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
    const hasCategory = req.query.category
    console.log(hasCategory)
    if(hasCategory) {
        console.log('kkkkkkkkkkk')
        const posts = await Post.find({ category: hasCategory }).populate("user");
        res.status(200).json(posts);
    } else {
        const posts = await Post.find({}).populate("user");
        res.status(200).json(posts);
    }
    // try {


    // } catch (error) {
    //     throw new Error(error.message)
    // }
})
//----------------------------------------------------------------
// FETCH SINGLE POST DATA
// @route GET => /api/posts/:id
//----------------------------------------------------------------
const fetchPostDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const post = await Post.findById(id).populate("user").populate("likes").populate("disLikes")
        if (!post) throw new Error("THis Post not found")
        //update number of views 
        await Post.findByIdAndUpdate(id, {
            $inc: { numViews: 1 }
        }, { new: true })
        res.status(200).json(post)
    } catch (error) {
        throw new Error(error.message)
    }
})
//----------------------------------------------------------------
// UPDATE POST
// @route PUT => /api/posts/:id
//----------------------------------------------------------------
const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    validateMongodbId(id)
    try {
        const post = await Post.findByIdAndUpdate(id, {
            ...req.body,
            user: userId,
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
const deletePost = asyncHandler((async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    validateMongodbId(id)
    try {
        res.status(200).json('deleted')
    } catch (error) {

    }
}))
//----------------------------------------------------------------
// LIKE POST
// @route POST => /api/posts/like
//----------------------------------------------------------------

const toggleAddLikeToPost = asyncHandler(async (req, res) => {
    //1.Find the post to be liked
    const { postId } = req.body;
    const post = await Post.findById(postId);
    //2. Find the login user
    const loginUserId = req?.user?.id;
    //3. Find is this user has liked this post?
    const isLiked = post?.isLiked;
    //4.Chech if this user has dislikes this post
    const alreadyDisliked = post?.disLikes?.find(
      userId => userId?.toString() === loginUserId?.toString()
    );
    //5.remove the user from dislikes array if exists
    if (alreadyDisliked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { disLikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(post);
    }
    //Toggle
    //Remove the user if he has liked the post
    if (isLiked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(post);
    } else {
      //add to likes
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(post);
    }
  });
//----------------------------------------------------------------
// DISLIKE POST
// @route POST => /api/posts/dislike
//----------------------------------------------------------------
  
  const toggleAddDislikeToPost = asyncHandler(async (req, res) => {
    //1.Find the post to be disLiked
    const { postId } = req.body;
    const post = await Post.findById(postId);
    //2.Find the login user
    const loginUserId = req?.user?.id;
    //3.Check if this user has already disLikes
    const isDisLiked = post?.isDisLiked;
    //4. Check if already like this post
    const alreadyLiked = post?.likes?.find(
      userId => userId.toString() === loginUserId?.toString()
    );
    //Remove this user from likes array if it exists
    if (alreadyLiked) {
      const post = await Post.findOneAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(post);
    }
    //Toggling
    //Remove this user from dislikes if already disliked
    if (isDisLiked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { disLikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(post);
    } else {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { disLikes: loginUserId },
          isDisLiked: true,
        },
        { new: true }
      );
      res.json(post);
    }
  });
module.exports = {
    createPost,
    fetchAllPosts,
    fetchPostDetails,
    updatePost,
    deletePost,
    toggleAddLikeToPost,
    toggleAddDislikeToPost

}
