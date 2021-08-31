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
  location: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  }
});

export default mongoose.model("User", userSchema);
