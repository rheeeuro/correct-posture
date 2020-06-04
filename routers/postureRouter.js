import express from "express";
import routes from "../routes";
import { posture, exerciseDetail } from "../controllers/postureController";

const postureRouter = express.Router();

postureRouter.get(routes.posture, posture);
postureRouter.get(routes.exerciseDetail, exerciseDetail);

export default postureRouter;
