import express from "express";
import routes from "../routes";
import { exerciseList, exerciseDetail } from "../controllers/postureController";
import { onlyPrivate } from "../middlewares";

const postureRouter = express.Router();

postureRouter.get(routes.exerciseList, exerciseList);
postureRouter.get(routes.exerciseDetail(), exerciseDetail);

export default postureRouter;
