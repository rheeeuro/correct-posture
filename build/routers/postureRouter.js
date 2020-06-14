"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _postureController = require("../controllers/postureController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postureRouter = _express["default"].Router();

postureRouter.get(_routes["default"].exerciseList, _postureController.exerciseList);
postureRouter.get(_routes["default"].exerciseDetail(), _postureController.exerciseDetail);
var _default = postureRouter;
exports["default"] = _default;