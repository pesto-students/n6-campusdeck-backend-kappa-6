import mongoose from "mongoose";

// defining a schema for how a comment will look like
const commentSchema = mongoose.Schema({
  parent: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorImg: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model("Comment", commentSchema);
