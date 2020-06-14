"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExerciseSchema = new _mongoose["default"].Schema({
  imageUrl: {
    type: String,
    required: "Image URL is required"
  },
  name: {
    type: String,
    required: "Name is required"
  },
  level: {
    type: Number,
    required: "Level is required"
  },
  modelUrl: {
    type: String,
    required: "Model Url us required"
  },
  type: Number
});

var model = _mongoose["default"].model("Exercise", ExerciseSchema);

var _default = model;
exports["default"] = _default;