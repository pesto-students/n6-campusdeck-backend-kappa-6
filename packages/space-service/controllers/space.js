import Space from "../models/space.js";

export const createSpace = async (req, res) => {
  const result = await Space.create({
    name: "Fests",
    desc: "A place to enjoy and get info about fests at VIT",
    tags: ["Info", "Advice", "Help"],

    // parent
    campus: "VIT, Vellore"
  });

  res.status(200).send({
    message: "Space created successfully"
  });
};
