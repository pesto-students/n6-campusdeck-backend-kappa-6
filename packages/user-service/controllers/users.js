import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signUp = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    campus,
    location,
    about
  } = req.body;

  try {
    // gets at most one user because email is unique
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `User with email: ${email} already exists`
      });
    }

    // check if both the passwords match or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: `Passwords do not match`
      });
    }

    // hash password with salt difficulty as 12. This determines the speed at which the salting occurs
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      userName: `${firstName}${lastName.charAt(0)}`,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      campus,
      location,
      about
    });

    /* at this point, we have a new user created.
        now we need to create and send a jwt
    */
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      result,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong. ${error}`
    });
  }
};
