import Space from "../models/space.js";

export const createSpace = async (req, res) => {
  const { name, desc, img, isPublic, campus, tags } = req.body;

  const newSpace = new Space({
    name,
    desc,
    img,
    isPublic,
    campus,
    tags
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
