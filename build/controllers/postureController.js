"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAddExercise = exports.getAddExercise = exports.exerciseDetail = exports.exerciseList = exports.judge = exports.home = void 0;

var _Exercise = _interopRequireDefault(require("../models/Exercise"));

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = function home(req, res) {
  return res.render("home", {
    pageTitle: "Home"
  });
};

exports.home = home;

var judge = function judge(req, res) {
  return res.render("judge", {
    pageTitle: "Judge"
  });
};

exports.judge = judge;

var exerciseList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var exercises;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Exercise["default"].find({});

          case 3:
            exercises = _context.sent;
            res.render("exerciseList", {
              pageTitle: "Exercise List",
              exercises: exercises
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function exerciseList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.exerciseList = exerciseList;

var exerciseDetail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, exercise;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Exercise["default"].findById(id);

          case 4:
            exercise = _context2.sent;
            res.render("exerciseDetail", {
              pageTitle: "".concat(exercise.name),
              exercise: exercise
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function exerciseDetail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Add Exercise


exports.exerciseDetail = exerciseDetail;

var getAddExercise = function getAddExercise(req, res) {
  console.log("a");
  res.render("addExercise", {
    pageTitle: "Add Exercise"
  });
};

exports.getAddExercise = getAddExercise;

var postAddExercise = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, imageUrl, name, level, modelUrl, type, newExercise;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, imageUrl = _req$body.imageUrl, name = _req$body.name, level = _req$body.level, modelUrl = _req$body.modelUrl, type = _req$body.type;
            _context3.prev = 1;
            _context3.next = 4;
            return _Exercise["default"].create({
              imageUrl: imageUrl,
              name: name,
              level: level,
              modelUrl: modelUrl,
              type: type
            });

          case 4:
            newExercise = _context3.sent;
            res.redirect(_routes["default"].exerciseDetail(newExercise.id));
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function postAddExercise(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postAddExercise = postAddExercise;