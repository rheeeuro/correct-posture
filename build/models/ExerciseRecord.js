"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExerciseRecordSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  exercise: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Exercise"
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var model = _mongoose["default"].model("Exercise", ExerciseRecordSchema);

var _default = model;
exports["default"] = _default;