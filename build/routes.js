"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var JUDGE = "/judge";
var ADD_EXERCISE = "/add-exercise"; // Users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password"; // Posture

var POSTURE = "/posture";
var EXERCISE_DETAIL = "/:id";
var EXERCISE_LIST = "/exerciseList"; // Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback";
var ME = "/me"; // Naver

var NAVER = "/auth/naver";
var NAVER_CALLBACK = "/auth/naver/callback";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  addExercise: ADD_EXERCISE,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    }

    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  posture: POSTURE,
  judge: JUDGE,
  exerciseList: EXERCISE_LIST,
  exerciseDetail: function exerciseDetail(id) {
    if (id) {
      return "/posture/".concat(id);
    }

    return EXERCISE_DETAIL;
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  me: ME
};
var _default = routes;
exports["default"] = _default;