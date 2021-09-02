import Campus from "../models/campus.js";

export const createCampus = async (req, res) => {
  // const result = await Campus.create({
  //   name: "VIT, Vellore",
  //   admin: "rtpushpak@gmail.com "
  // });

  res.status(200).send({
    message: "Campus created successfully"
  });
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
