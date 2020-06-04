import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Correct-posture";
  res.locals.routes = routes;
  next();
};
