"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _postureController = require("../controllers/postureController");

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].judge, _postureController.judge);
globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userController.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userController.postJoin, _userController.postLogin);
globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userController.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userController.postLogin);
globalRouter.get(_routes["default"].home, _postureController.home);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userController.logout);
globalRouter.get(_routes["default"].addExercise, _middlewares.onlyPrivate, _postureController.getAddExercise);
globalRouter.post(_routes["default"].addExercise, _middlewares.onlyPrivate, _postureController.postAddExercise);
globalRouter.get(_routes["default"].gitHub, _userController.githubLogin);
globalRouter.get(_routes["default"].gitHub, _userController.githubLogin);
globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: "/login"
}), _userController.postGithubLogIn);
globalRouter.get(_routes["default"].me, _userController.getMe);
globalRouter.get(_routes["default"].naver, _userController.naverLogin);
globalRouter.get(_routes["default"].naverCallback, _passport["default"].authenticate("naver", {
  failureRedirect: "/login"
}), _userController.postnaverLogin);
var _default = globalRouter;
exports["default"] = _default;