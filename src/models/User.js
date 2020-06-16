import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  naverId: Number,
  githubId: Number,
  exerciseRecords: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ExerciseRecord",
    },
  ],
  totalGoodTime: {
    type: Number,
    default: 0,
  },
  totalBadTime: {
    type: Number,
    default: 0,
  },
  headGoodTime: {
    type: Number,
    default: 0,
  },
  headBadTime: {
    type: Number,
    default: 0,
  },
  shoulderGoodTime: {
    type: Number,
    default: 0,
  },
  shoulderBadTime: {
    type: Number,
    default: 0,
  },
  legGoodTime: {
    type: Number,
    default: 0,
  },
  legBadTime: {
    type: Number,
    default: 0,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
