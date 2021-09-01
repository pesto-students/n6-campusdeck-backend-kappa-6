import Post from "../models/post.js";

export const createPost = async (req, res) => {
  const result = await Post.create({
    title: "Test post 1",
    body: "This is a test post. Will be deleted later",
    tag: "Info",
    space: "Fests"
  });

  res.status(200).send({
    message: "Post created successfully"
  });
};
