import axios from "axios";
import Post from "../models/post.js";

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
    res.status(409).json({
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
