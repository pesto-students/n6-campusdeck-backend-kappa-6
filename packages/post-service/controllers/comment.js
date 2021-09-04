import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const createComment = async (req, res) => {
  const { parentId } = req.params;
  const { authorName, authorImg, content, createdAt } = req.body;

  const newComment = new Comment({
    parent: parentId,
    author: authorName,
    authorImg,
    content,
    createdAt
  });

  try {
    await newComment.save();

    const post = await Post.findById(parentId);

    post.comments.push(newComment._id);

    const updatedPost = await Post.findByIdAndUpdate(parentId, post, {
      new: true
    });

    res.status(200).send({
      status: "success",
      data: updatedPost
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message
    });
  }
};
