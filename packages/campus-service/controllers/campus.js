import { Campus } from "models";

export const createCampus = async (req, res) => {
  const { name, admin } = req.body;

  const result = await Campus.create({
    name,
    admin
  });

  res.status(200).send({
    message: "Campus created successfully",
    data: result
  });
};

export const getCampusById = async (req, res) => {
  const { id } = req.params;

  try {
    const campus = await Campus.findById(id);

    res.status(200).send({
      status: "success",
      data: campus
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

export const getCampusByName = async (req, res) => {
  const { name } = req.params;

  try {
    const campus = await Campus.find({ name });

    res.status(200).json({
      status: "success",
      data: campus
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

export const getAllCampus = async (req, res) => {
  try {
    const allCampus = await Campus.find().sort({ _id: "desc" });

    res.status(200).json({
      status: "success",
      data: allCampus
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};
