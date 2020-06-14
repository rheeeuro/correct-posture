import Exercise from "../models/Exercise";
import routes from "../routes";

export const home = (req, res) => res.render("home", { pageTitle: "Home" });

export const judge = (req, res) => res.render("judge", { pageTitle: "Judge" });

export const exerciseList = async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.render("exerciseList", { pageTitle: "Exercise List", exercises });
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
    body: { imageUrl, name, level, modelUrl, type },
  } = req;
  try {
    const newExercise = await Exercise.create({
      imageUrl,
      name,
      level,
      modelUrl,
      type,
    });
    res.redirect(routes.exerciseDetail(newExercise.id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
