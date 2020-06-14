"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportNaver = _interopRequireDefault(require("passport-naver"));

var _User = _interopRequireDefault(require("./models/User"));

var _userController = require("./controllers/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportNaver["default"]({
  clientID: process.env.NAVER_ID,
  clientSecret: process.env.NAVER_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].naverCallback)
}, _userController.naverLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());