import express from "express";
import routes from "../routes";
import {
  judge,
  exerciseList,
  exerciseDetail,
} from "../controllers/postureController";
import { onlyPrivate } from "../middlewares";

const postureRouter = express.Router();

postureRouter.get(routes.judge, judge);
postureRouter.get(routes.exerciseList, exerciseList);
postureRouter.get(routes.exerciseDetail(), exerciseDetail);

export default postureRouter;
