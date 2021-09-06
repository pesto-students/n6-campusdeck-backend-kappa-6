import mongoose from "mongoose";

// defining a schema for how a user will look like
const spaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
    validate: [
      val => {
        // we can only have maximum of 5 tags
        return val.length <= 5;
      },
      "{PATH} exceeds the limit of 5 items"
    ]
  },
  img: {
    type: String,
    required: false
  },
  // parent
  campus: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  creator: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  members: {
    type: [String],
    default: []
  }
});

export default mongoose.model("Space", spaceSchema);
