import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  home,
  judge,
  getAddExercise,
  postAddExercise,
} from "../controllers/postureController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  getMe,
  naverLogin,
  postnaverLogin,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate, isAdmin } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.judge, judge);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.addExercise, isAdmin, getAddExercise);
globalRouter.post(routes.addExercise, isAdmin, postAddExercise);

globalRouter.get(routes.home, home);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: "/login" }),
  postnaverLogin
);

export default globalRouter;
