import Campus from "../models/campus.js";

export const createCampus = async (req, res) => {
  const result = await Campus.create({
    name: "VIT, Vellore",
    admin: "rtpushpak@gmail.com "
  });

  res.status(200).send({
    message: "Campus created successfully"
  });
};
