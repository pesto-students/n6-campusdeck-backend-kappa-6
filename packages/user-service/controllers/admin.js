import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import sgMail from "@sendgrid/mail";
import { Admin, User } from "models";

// setting the API key for sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendInvites = async (req, res) => {
  const { encodedInfo } = req.body;

  try {
    if (encodedInfo) {
      const { email, campus } = JSON.parse(atob(encodedInfo));

      const msg = {
        to: email,
        from: "rtpushpak@gmail.com",
        subject: `Welcome to CampusDeck!`,
        html: `<strong>${campus}</strong> is inviting you to join CampusDeck.
        Click <a clicktracking="off" href="http://localhost:3000/register/${encodedInfo}">here</a> to join.`
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log("Message sent!");
        })
        .catch(err => {
          console.log(`Some problem while sending the mail: ${err}`);
        });

      return res.status(200).json({
        status: "success"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const getStudentsInCampus = async (req, res) => {
  const { campus } = req.params;

  try {
    const users = await User.find({ campus });

    if (users.length === 0) {
      return res.status(404).json({
        status: "success",
        data: "No users found"
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: users
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    campus,
    password,
    confirmPassword,
    message
  } = req.body;

  try {
    // gets at most one user because email is unique
    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `Admin with email: ${email} already exists`
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

    // check if the campus already exists
    const {
      data: { data }
    } = await axios.get(
      `${process.env.CAMPUS_SERVICE_URL}/campus/getByName/${campus}`
    );

    // if campus doesn't exist, create it
    if (!data.length) {
      await axios.post(`${process.env.CAMPUS_SERVICE_URL}/campus`, {
        name: campus,
        admin: email
      });
    }

    const result = await Admin.create({
      email,
      userName,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      campus,
      message
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
      { expiresIn: "3h" }
    );

    return res.status(200).json({
      result,
      status: "success",
      token
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // gets at most one admin because email is unique
    const existingUser = await Admin.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: `Admin with email: ${email} doesn't exist`
      });
    }

    // if admin does exist, we need to check whether the password matches or not
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* if we bypass both the conditions above, that means that we have a correct user logging in
        in which case, we will create and send the jwt to the client
    */
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      result: existingUser,
      status: "success",
      token
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};
