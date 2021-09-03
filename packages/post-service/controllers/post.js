import Post from "../models/post.js";

export const createPost = async (req, res) => {
  const { title, type, body, tag, space, isPublic } = req.body;

  const newPost = new Post({
    title,
    type,
    body,
    tag,
    space,
    isPublic
  });

  try {
    await newPost.save();

    res.status(201).send({
      status: "success",
      data: newPost
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message
    });
  }
};
