"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = void 0;

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "C-posture";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  console.log(req.user);
  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;