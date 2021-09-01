import Campus from "../models/campus.js";

export const createCampus = async (req, res) => {
  Campus.create();
};
