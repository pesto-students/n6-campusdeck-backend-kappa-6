import mongoose from "mongoose";

// defining a schema for how a cammpus will look like
const campusSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: String,
    required: true,
    unique: false
  }
});

export default mongoose.model("Campus", campusSchema);
