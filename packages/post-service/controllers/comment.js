import { Post, Comment } from "models";

export const createComment = async (req, res) => {
  const { parentId } = req.params;
  const { author, authorImg, content, createdAt } = req.body;

  const newComment = new Comment({
    parent: parentId,
    author,
    authorImg,
    content,
    createdAt
  });

  try {
    const comment = await newComment.save({ new: true });

    const post = await Post.findById(parentId);

    post.comments.push(newComment._id);

    const updatedPost = await Post.findByIdAndUpdate(parentId, post, {
      new: true
    });

    res.status(200).send({
      status: "success",
      data: { updatedPost, comment }
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message
    });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (comment) {
      res.status(200).send({
        status: "success",
        data: comment
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message
    });
  }
};
