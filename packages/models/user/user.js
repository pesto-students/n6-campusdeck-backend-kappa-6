import mongoose from "mongoose";

// defining a schema for how a user will look like
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  profileImg: {
    type: String,
    required: false
  },
  mySpaces: {
    type: [String],
    default: []
  },
  preferences: {
    type: [String],
    default: []
  },
  savedPosts: {
    type: [String],
    default: []
  },
  followers: {
    type: [String],
    default: []
  }
});

export default mongoose.model("User", userSchema);
