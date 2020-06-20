// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const JUDGE = "/judge";
const ADD_EXERCISE = "/add-exercise";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Posture

const POSTURE = "/posture";
const EXERCISE_DETAIL = "/:id";
const EXERCISE_LIST = "/exerciseList";
const RECOMMEND = "/recommend/:type";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

const ME = "/me";

// Naver

const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

// API

const API = "/api";
const SAVE_STATISTICS = "/save-statistics";
const SAVE_HISTORY = "/:id/save-history";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  addExercise: ADD_EXERCISE,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  posture: POSTURE,
  judge: JUDGE,
  exerciseList: EXERCISE_LIST,
  exerciseDetail: (id) => {
    if (id) {
      return `/posture/${id}`;
    }
    return EXERCISE_DETAIL;
  },
  recommend: (type) => {
    if (type) {
      return `/posture/recommend/${type}`;
    }
    return RECOMMEND;
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  me: ME,
  api: API,
  saveStatistics: SAVE_STATISTICS,
  saveHistory: SAVE_HISTORY,
};

export default routes;
