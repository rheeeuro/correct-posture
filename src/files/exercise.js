/*eslint-disable */

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const image = document.getElementById("exerciseImage");
const startButton = document.getElementById("startButton");
const saveButton = document.getElementById("saveButton");
const redirectButton = document.getElementById("redirectButton");
const username = document.getElementById("username");
const countInfo = document.getElementById("jsCountinfo");

let model;
let webcam;
let ctx;
let labelContainer;
let maxPredictions;

let status = "none";
let setProgress = 327;
let countProgress = 327;
let count = 0;

async function init() {
  const URL = document.getElementById("modelUrl").value;
  startButton.style.display = "none";
  if (username) {
    saveButton.style.display = "block";
  } else {
    redirectButton.style.display = "block";
  }
  if (countInfo) {
    countInfo.style.display = "flex";
  }
  const modelURL = `../files/models/${URL}/model.json`;
  const metadataURL = `../files/models/${URL}/metadata.json`;

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 400;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append/get elements to the DOM
  const canvas = document.getElementById("exerciseCanvas");
  image.style.display = "none";
  canvas.style.display = "block";
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  const countValue = document.getElementById(exerciseCount);
  const unitCount = parseInt(countValue, 10);
  // [0] - pose 1(first), [1] - pose 2(last), [2] - else, [3] - nocam , ...
  if (prediction[0].probability.toFixed(2) > 0.9) {
    if (status == "two") {
      count += 1;
      document.getElementById("setCount").innerHTML = `Set count: ${parseInt(
        count / unitCount
      )}`;

      // count set
      if (count % 10 === 0) {
        setProgress = setProgress - 32.7;
        if (setProgress <= 0) {
          setProgress = 327 - 32.7;
        }
        document.getElementById(
          "jsSetProgress"
        ).style.strokeDashoffset = setProgress;
        document.getElementById("jsSet").innerHTML = parseInt(
          count / unitCount
        );
      }

      // count times
      countProgress = countProgress - 32.7;
      if (countProgress <= 0) {
        countProgress = 327 - 32.7;
      }
      document.getElementById(
        "jsCountProgress"
      ).style.strokeDashoffset = countProgress;
      document.getElementById("jsCount").innerHTML = count;

      let audio = new Audio(`../files/audios/${count % 10}.wav`);
      audio.play();
    }
    status = "one";
  } else if (prediction[1].probability.toFixed(2) == 1.0) {
    status = "two";
  } else if (prediction[2].probability.toFixed(2) === 1.0) {
    if (status !== "else") {
      let audio = new Audio("../files/audios/beep.wav");
      audio.play();
    }
    status = "else";
  } else if (prediction[3].probability.toFixed(2) === 1.0) {
    if (status !== "nocam") {
      // nocam process
    }
    status = "nocam";
  }

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }

  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}

if (startButton) {
  startButton.addEventListener("click", init);
}
