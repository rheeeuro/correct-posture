import * as posenet from "@tensorflow-models/posenet";
import routes from "./routes";

export const estimatePoseOnImage = async (imageElement) => {
  // load the posenet model from a checkpoint
  const net = await posenet.load();

  const pose = await net.estimateSinglePose(imageElement, {
    flipHorizontal: false,
  });
  console.log(pose);
  return pose;
};

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "C-posture";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  res.locals.estimatePoseOnImage = estimatePoseOnImage;
  console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
