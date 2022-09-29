const express = require("express");
const {
  createComment,
  fetchAllComments,
  fetchComment,
  updateComment,
  deleteComment,
} = require("../../controllers/comments/commentControl");
const protect = require("../../middlewares/auth/authMiddleware");
const router = express.Router();

router.post("/", protect, createComment);
router.get("/", fetchAllComments);
router.get("/:id", protect, fetchComment);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;
