import express from "express";
import routes from "../routes";
import {
  postSaveStatistics,
  postSaveHistory,
} from "../controllers/postureController";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.saveStatistics, onlyPrivate, postSaveStatistics);
apiRouter.post(routes.saveHistory, onlyPrivate, postSaveHistory);

export default apiRouter;
