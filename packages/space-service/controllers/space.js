import mongoose from "mongoose";
import uniq from "lodash/uniq.js";
import { Space, User, Campus } from "models";

export const editSpace = async (req, res) => {
  const { id: spaceId } = req.params;
  const { name, desc, img, isPublic, tags } = req.body;

  try {
    const space = await Space.findById(spaceId);

    if (space) {
      const updatedSpace = await Space.findByIdAndUpdate(
        spaceId,
        {
          name,
          desc,
          img,
          isPublic,
          tags
        },
        { new: true }
      );
      res.status(201).send({
        status: "success",
        data: updatedSpace
      });
    } else {
      res.status(404).send({
        status: "success",
        data: "Space not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const searchSpace = async (req, res) => {
  const { q } = req.query;

  try {
    // creates a case-insensitive regex based on our search term
    const searchTerm = new RegExp(q, "i");

    const spaces = await Space.find({
      $or: [
        { name: searchTerm },
        { desc: searchTerm },
        {
          tags: {
            $in: searchTerm
          }
        }
      ]
    });

    if (spaces.length > 0) {
      res.status(200).send({
        status: "success",
        data: spaces
      });
    } else {
      res.status(404).send({
        status: "success",
        data: "No spaces found"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const getPreferredSpaces = async (req, res) => {
  const userId = req.userId;
  const preferredSpaces = [];

  try {
    const user = await User.findById(userId);

    const userPref = user.preferences;

    const allCampus = await Campus.find();

    if (allCampus) {
      for (const campus of allCampus) {
        const spaces = campus.spaces;

        if (spaces) {
          for (const space of spaces) {
            const dbSpace = await Space.findById(space);

            if (dbSpace) {
              const tags = dbSpace.tags;

              tags?.map(tag => {
                if (userPref.includes(tag)) {
                  preferredSpaces.push(dbSpace._id);
                }
              });
            }
          }
        }
      }
    }

    res.status(200).send({
      status: "success",
      data: uniq(preferredSpaces)
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

export const getTrendingSpaces = async (req, res) => {
  try {
    const trendingSpaces = await Space.find().sort({ members: -1 }).limit(5);

    res.status(200).send({
      status: "success",
      data: trendingSpaces
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

export const createSpace = async (req, res) => {
  const { name, desc, img, isPublic, campus, tags } = req.body;

  const newSpace = new Space({
    name,
    desc,
    img,
    isPublic,
    campus,
    tags,
    creator: req.userId,
    createdAt: new Date().toISOString()
  });

  try {
    const { _id } = await newSpace.save({ new: true });

    const dbCampus = await Campus.findById(campus);

    dbCampus.spaces.push(_id);

    await Campus.findByIdAndUpdate(campus, dbCampus);

    res.status(201).send({
      status: "success",
      data: newSpace
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message
    });
  }
};

export const getSpaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const space = await Space.findById(id);

    res.status(200).json({
      status: "success",
      data: space
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message
    });
  }
};

export const getAllSpacesByCampus = async (req, res) => {
  const { campusId } = req.params;

  try {
    const spaces = await Space.find({ campus: campusId });

    res.status(200).send({
      status: "success",
      data: spaces
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

export const joinSpace = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  // check if the user is logged in
  if (!userId) {
    return res.status(401).json({
      message: "You do not have authorization to perform this action"
    });
  }

  // checking to see if the received ID is a valid ID as per mongodb
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No spaces found with the ID of ${id}`);

  try {
    // finding the space by ID
    const space = await Space.findById(id);

    const index = space.members.findIndex(id => id === String(userId));

    if (index === -1) {
      space.members.push(userId);
    } else {
      space.members = space.members.filter(id => id !== String(userId));
    }

    const updatedSpace = await Space.findByIdAndUpdate(id, space, {
      new: true
    });

    const user = await User.findById(userId);
    const spaceIdx = user.mySpaces.findIndex(spaceId => spaceId === String(id));

    if (spaceIdx === -1) {
      user.mySpaces.push(id);
    } else {
      user.mySpaces = user.mySpaces.filter(spaceId => spaceId !== String(id));
    }

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true
    });

    res.status(200).send({
      status: "success",
      data: { updatedSpace, updatedUser }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: `Some error occured. ${error.message}`
    });
  }
};
