"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
// the link to your model provided by Teachable Machine export panel
var URL = "https://teachablemachine.withgoogle.com/models/J8VRvhaFz/";
var doButton = document.getElementById("doButton");
var model;
var webcam;
var ctx;
var labelContainer;
var maxPredictions;

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var modelURL, metadataURL, size, flip, canvas, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modelURL = URL + "model.json";
            metadataURL = URL + "metadata.json"; // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // Note: the pose library adds a tmPose object to your window (window.tmPose)

            _context.next = 4;
            return tmPose.load(modelURL, metadataURL);

          case 4:
            model = _context.sent;
            maxPredictions = model.getTotalClasses(); // Convenience function to setup a webcam

            size = 400;
            flip = true; // whether to flip the webcam

            webcam = new tmPose.Webcam(size, size, flip); // width, height, flip

            _context.next = 11;
            return webcam.setup();

          case 11:
            _context.next = 13;
            return webcam.play();

          case 13:
            window.requestAnimationFrame(loop); // append/get elements to the DOM

            canvas = document.getElementById("canvas");
            canvas.width = size;
            canvas.height = size;
            ctx = canvas.getContext("2d");
            labelContainer = document.getElementById("label-container");

            for (i = 0; i < maxPredictions; i++) {
              // and class labels
              labelContainer.appendChild(document.createElement("div"));
            }

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _init.apply(this, arguments);
}

function loop(_x) {
  return _loop.apply(this, arguments);
}

function _loop() {
  _loop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(timestamp) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            webcam.update(); // update the webcam frame

            _context2.next = 3;
            return predict();

          case 3:
            window.requestAnimationFrame(loop);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loop.apply(this, arguments);
}

function predict() {
  return _predict.apply(this, arguments);
}

function _predict() {
  _predict = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var _yield$model$estimate, pose, posenetOutput, prediction, i, classPrediction;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return model.estimatePose(webcam.canvas);

          case 2:
            _yield$model$estimate = _context3.sent;
            pose = _yield$model$estimate.pose;
            posenetOutput = _yield$model$estimate.posenetOutput;
            _context3.next = 7;
            return model.predict(posenetOutput);

          case 7:
            prediction = _context3.sent;

            for (i = 0; i < maxPredictions; i++) {
              classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
              labelContainer.childNodes[i].innerHTML = classPrediction;
            } // finally draw the poses


            drawPose(pose);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _predict.apply(this, arguments);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0); // draw the keypoints and skeleton

    if (pose) {
      var minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}