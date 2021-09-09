import mongoose from "mongoose";
import axios from "axios";
import { Post } from "models";

export const getPostsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ creator: id });

    if (posts) {
      res.status(200).send({
        status: "success",
        data: posts
      });
    } else {
      res.status(404).send({
        status: "success",
        data: "No posts found by user"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const searchPosts = async (req, res) => {
  const { q } = req.query;

  try {
    // creates a case-insensitive regex based on our search term
    const searchTerm = new RegExp(q, "i");

    const posts = await Post.find({
      $or: [{ title: searchTerm }, { body: searchTerm }, { tag: searchTerm }]
    });

    if (posts.length > 0) {
      res.status(200).send({
        status: "success",
        data: posts
      });
    } else {
      res.status(404).send({
        status: "success",
        data: "No posts found"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const getPostsByCampus = async (req, res) => {
  const { campusId } = req.params;

  try {
    const posts = await Post.find({ campus: campusId })
      .sort({
        createdAt: "desc"
      })
      .limit(5);

    res.status(200).send({
      status: "success",
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const getPostsBySpace = async (req, res) => {
  const { spaceId } = req.params;

  try {
    const posts = await Post.find({ space: spaceId })
      .sort({
        createdAt: "desc"
      })
      .limit(3);

    res.status(200).send({
      status: "success",
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  // checking to see if the received ID is a valid ID as per mongodb
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No posts found with the ID of ${id}`);

  try {
    const post = await Post.findById(id);

    /**
     * Checks to see if the current user has already liked a particular post.
     * Value of 'index' will be -1 if the user has not liked the post. In that case,
     * we want to add the userId to the likes array.
     * Value of index will not be -1 if the user has already liked the post. In that
     * case, that userId will be removed from the likes array, essentially unliking the post.
     */
    const index = post.likes.findIndex(id => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true
    });

    res.status(200).send({
      status: "success",
      data: updatedPost
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

export const createPost = async (req, res) => {
  const { title, type, body, tag, space, campus, isPublic } = req.body;

  const newPost = new Post({
    title,
    type,
    body,
    tag,
    space,
    campus,
    isPublic,
    creator: req.userId,
    createdAt: new Date().toISOString()
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

export const getFeed = async (req, res) => {
  const userId = req.userId;
  let feed = [];

  try {
    // get the user based on the logged in user id
    const {
      data: { data: user }
    } = await axios.get(`${process.env.USER_SERVICE_URL}/users/${userId}`);

    // get the campus name of the user
    const campus = user.campus;

    const {
      data: { data: campusObj }
    } = await axios.get(
      `${process.env.CAMPUS_SERVICE_URL}/campus/getByName/${campus}`
    );

    // based on the campus name, get the campus Id
    const campusId = campusObj[0]?._id;

    // get all spaces of that campus
    const {
      data: { data: spaces }
    } = await axios.get(
      `${process.env.SPACE_SERVICE_URL}/space/campus/${campusId}`
    );

    // for each space, fetch the posts
    for (const space of spaces) {
      const id = space._id;

      const {
        data: { data: posts }
      } = await axios.get(`${process.env.POST_SERVICE_URL}/post/space/${id}`);

      feed.push(...posts);
    }

    res.status(200).send({
      status: "success",
      data: feed
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};
