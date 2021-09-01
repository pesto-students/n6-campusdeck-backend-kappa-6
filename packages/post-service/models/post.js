import mongoose from "mongoose";

// defining a schema for how a post will look like
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["TEXT", "MEDIA", "POLL", "ANNOUNCEMENT"],
    default: "TEXT"
  },
  body: {
    type: String,
    required: true
  },
  tag: {
    type: String
  },
  // parent
  space: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Post", postSchema);
