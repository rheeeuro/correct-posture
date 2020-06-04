import express from "express";
import routes from "../routes";
import { judge, exerciseDetail } from "../controllers/postureController";

const postureRouter = express.Router();

postureRouter.get(routes.judge, judge);
postureRouter.get(routes.exerciseDetail, exerciseDetail);

export default postureRouter;
