import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
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
  set: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  name: String,
  level: Number,
});

const model = mongoose.model("History", HistorySchema);
export default model;
