import Exercise from "../models/Exercise";

export const home = (req, res) => res.render("home", { pageTitle: "Home" });

export const judge = (req, res) => res.render("judge", { pageTitle: "Judge" });

export const exerciseList = async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.render("exerciseList", { pageTitle: "Exercise List", exercises });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", exercise: [] });
  }
};

export const exerciseDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const exercise = await Exercise.findById(id);
    res.render("exerciseDetail", { pageTitle: "휴대폰 정보", exercise });
  } catch (error) {
    res.redirect(routes.home);
  }
};
