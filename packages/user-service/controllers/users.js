import User from "../models/user.js";

export const signUp = async (req, res) => {
  res.send("reached signup controller");

  // dummy user creation to test mongodb atlas connection. will be removed later.
  // const result = await User.create({
  //   email: "rtpushpak@gmail.com",
  //   userName: "PushpakB",
  //   password: "pass123",
  //   name: `Pushpak Bhattacharya`
  // });

  // return res.status(200).json({
  //   result
  // });
};
