import mongoose from "mongoose";

// defining a schema for how a cammpus will look like
const campusSchema = mongoose.Schema({});

export default mongoose.model("Campus", campusSchema);
