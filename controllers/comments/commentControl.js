const asyncHandler = require("express-async-handler");
const Comment = require("../../model/comments/Comment");
const validateMongodbId = require("../../utils/validateMongodbID");

//-------------------------------------------------------------
//Create
//-------------------------------------------------------------
const createComment = asyncHandler(async (req, res) => {
  //1.Get the user
  const user = req.user;
  //2.Get the post Id
  const { postId, description } = req.body;
  console.log(description);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.status(200).json(comment);
  } catch (error) {
    throw new Error(error.message)
  }
});

//-------------------------------
//fetch all comments
//-------------------------------

const fetchAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    throw new Error(error.message)
  }
});

//------------------------------
//commet details
//------------------------------
const fetchComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
   throw new Error(error.message)
  }
});

//------------------------------
//Update
//------------------------------

const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const update = await Comment.findByIdAndUpdate(
      id,
      {
        post: req.body?.postId,
        user: req?.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(update);
  } catch (error) {
   throw new Error(error.message);
  }
});

//------------------------------
//delete
//------------------------------

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json(comment);
  } catch (error) {
   throw new Error(error.message)
  }
});

module.exports = {
  deleteComment,
  updateComment,
  createComment,
  fetchAllComments,
  fetchComment,
};
