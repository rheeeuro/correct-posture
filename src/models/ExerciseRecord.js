import mongoose from "mongoose";

const ExerciseRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Exercise", ExerciseRecordSchema);
export default model;
