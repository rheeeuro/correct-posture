import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Exercise from "../models/Exercise";

// Join

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

// Log in

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// Github

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email, login },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email: `${login}@users.noreply.github.com`,
      name,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

// Naver

export const naverLogin = passport.authenticate("naver", {
  successFlash: "Welcome",
  failureFlash: "Cannot log in now",
});

export const naverLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, nickname: name, email },
  } = profile;
  try {
    const user = await User.findOne({ id });
    if (user) {
      user.naverId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      naverId: id,
      name,
      email,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postnaverLogin = (req, res) => {
  res.redirect(routes.home);
};

// Log out

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// Me

export const getMe = async (req, res) => {
  let exercises = [];
  let newExercises = [];

  const headPercent =
    req.user.headGoodTime / (req.user.headGoodTime + req.user.headBadTime);
  const shoulderPercent =
    req.user.shoulderGoodTime /
    (req.user.shoulderGoodTime + req.user.shoulderBadTime);
  const legPercent =
    req.user.legGoodTime / (req.user.legGoodTime + req.user.legBadTime);

  try {
    newExercises = await Exercise.find({ type: 0 });
    exercises = exercises.concat(newExercises);
    if (headPercent < 0.5) {
      newExercises = await Exercise.find({ type: 1 });
      exercises = exercises.concat(newExercises);
    }
    if (shoulderPercent < 0.5) {
      newExercises = await Exercise.find({ type: 2 });
      exercises = exercises.concat(newExercises);
    }
    if (
      legPercent < 0.5 &&
      req.user.legGoodTime !== 0 &&
      req.user.legBadTime !== 0
    ) {
      newExercises = await Exercise.find({ type: 3 });
      exercises = exercises.concat(newExercises);
    }
  } catch (error) {
    console.log(error);
  }
  const user = await User.findById(req.user.id).populate("histories");
  res.render("userDetail", { pageTitle: "My Profile", user, exercises });
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });

// Edit Profile

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

// Change Password

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
