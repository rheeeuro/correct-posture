import express from "express";
import routes from "../routes";
import {
  exerciseList,
  exerciseDetail,
  recommend,
} from "../controllers/postureController";

const postureRouter = express.Router();

postureRouter.get(routes.exerciseList, exerciseList);
postureRouter.get(routes.exerciseDetail(), exerciseDetail);
postureRouter.get(routes.recommend(), recommend);

export default postureRouter;
