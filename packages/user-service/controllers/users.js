import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "models";

export const updateProfileImg = async (req, res) => {
  const userId = req.userId;
  const { image } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      user.profileImg = image;

      const updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true
      });

      res.status(200).send({
        status: "success",
        data: updatedUser
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const followUser = async (req, res) => {
  const { id: followee } = req.params;
  const followerId = req.userId;
  let operationType = "follow";

  try {
    const user = await User.findById(followee);

    if (user) {
      const index = user.followers.findIndex(id => id === String(followerId));

      if (index === -1) {
        user.followers.push(followerId);
      } else {
        user.followers = user.followers.filter(id => id !== String(followerId));
        operationType = "unfollow";
      }

      const updatedUser = await User.findByIdAndUpdate(followee, user, {
        new: true
      });

      res.status(200).send({
        status: "success",
        operationType,
        data: updatedUser
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const savePost = async (req, res) => {
  const { userId, postId } = req.params;
  let isAdded = false;

  try {
    const user = await User.findById(userId);

    if (user) {
      const index = user.savedPosts.findIndex(id => id === String(postId));

      if (index === -1) {
        user.savedPosts.push(postId);
        isAdded = true;
      } else {
        user.savedPosts = user.savedPosts.filter(id => id !== String(postId));
      }

      const updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true
      });

      res.status(200).send({
        status: "success",
        type: isAdded ? "added" : "removed",
        data: updatedUser
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
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    userName,
    campus,
    location,
    about,
    role
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
      userName,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      campus,
      location,
      about,
      role
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
    // gets at most one user because email is unique
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: `User with email: ${email} doesn't exist`
      });
    }

    // if user does exist, we need to check whether the password matches or not
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
      { expiresIn: "3h" }
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

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json({
        status: "success",
        data: user
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const addPreference = async (req, res) => {
  const { id } = req.params;
  const { preferences } = req.body;

  try {
    const user = await User.findById(id);

    if (user) {
      user.preferences.push(...preferences);

      const updatedUser = await User.findByIdAndUpdate(id, user, {
        new: true
      });

      res.status(200).send({
        status: "success",
        data: updatedUser
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};

export const getUserSpaces = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user && user.mySpaces) {
      return res.status(200).json({
        status: "success",
        data: user.mySpaces
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Something went wrong. ${error}`
    });
  }
};
