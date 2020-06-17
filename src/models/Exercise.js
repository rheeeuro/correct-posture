import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: "Image URL is required",
  },
  name: {
    type: String,
    required: "Name is required",
  },
  level: {
    type: Number,
    required: "Level is required",
  },
  modelUrl: {
    type: String,
    required: "Model Url us required",
  },
  type: Number,
  description: String,
});

const model = mongoose.model("Exercise", ExerciseSchema);
export default model;
