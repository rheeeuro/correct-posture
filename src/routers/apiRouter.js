import express from "express";
import routes from "../routes";
import { postSaveStatistics } from "../controllers/postureController";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.saveStatistics, onlyPrivate, postSaveStatistics);

export default apiRouter;
