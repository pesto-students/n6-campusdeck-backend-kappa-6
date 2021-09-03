import mongoose from "mongoose";

// defining a schema for how an admin will look like
const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
  password: {
    type: String,
    required: true
  },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campus",
    required: true
  },
  message: {
    type: String,
    required: false
  },
  profileImg: {
    type: String,
    required: false
  }
});

export default mongoose.model("Admin", adminSchema);
