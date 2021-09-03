import Space from "../models/space.js";

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
    await newSpace.save();

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
    const spaces = await Space.find({ campusId });

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
