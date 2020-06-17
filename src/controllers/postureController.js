import Exercise from "../models/Exercise";
import History from "../models/History";
import User from "../models/User";
import routes from "../routes";

export const home = (req, res) => res.render("home", { pageTitle: "Home" });

export const judge = (req, res) => res.render("judge", { pageTitle: "Judge" });

export const exerciseList = async (req, res) => {
  try {
    const exercises0 = await Exercise.find({ type: 0 });
    const exercises1 = await Exercise.find({ type: 1 });
    const exercises2 = await Exercise.find({ type: 2 });
    const exercises3 = await Exercise.find({ type: 3 });
    res.render("exerciseList", {
      pageTitle: "Exercise List",
      exercises0,
      exercises1,
      exercises2,
      exercises3,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const exerciseDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const exercise = await Exercise.findById(id);
    res.render("exerciseDetail", { pageTitle: `${exercise.name}`, exercise });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Add Exercise
export const getAddExercise = (req, res) => {
  console.log("a");
  res.render("addExercise", { pageTitle: "Add Exercise" });
};
export const postAddExercise = async (req, res) => {
  const {
    body: { imageUrl, name, level, modelUrl, type, description },
  } = req;
  try {
    const newExercise = await Exercise.create({
      imageUrl,
      name,
      level,
      modelUrl,
      type,
      description,
    });
    res.redirect(routes.exerciseDetail(newExercise.id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postSaveStatistics = async (req, res) => {
  const {
    body: {
      goodTotal,
      badTotal,
      goodHead,
      badHead,
      goodShoulder,
      badShoulder,
      goodLeg,
      badLeg,
    },
    user,
  } = req;

  try {
    const judgedUser = await User.findById(user.id);
    judgedUser.totalGoodTime += goodTotal;
    judgedUser.totalBadTime += badTotal;
    judgedUser.headGoodTime += goodHead;
    judgedUser.headBadTime += badHead;
    judgedUser.shoulderGoodTime += goodShoulder;
    judgedUser.shoulderBadTime += badShoulder;
    judgedUser.legGoodTime += goodLeg;
    judgedUser.legBadTime += badLeg;
    judgedUser.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const postSaveHistory = async (req, res) => {
  const {
    params: { id },
    body: { set },
  } = req;

  try {
    const didUser = await User.findById(req.user.id);
    const exercise = await Exercise.findById(id);
    const history = await History.create({
      user: didUser.id,
      name: exercise.name,
      exercise: exercise.id,
      set,
      imageUrl: exercise.imageUrl,
      level: exercise.level,
    });
    didUser.histories.push(history.id);
    didUser.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};
