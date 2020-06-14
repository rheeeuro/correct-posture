"use strict";

/*eslint-disable */
var video;
var poseNet;
var pose;
var skeleton;
var resultCard = document.getElementById("jsResultCard");
var headCard = document.getElementById("jsHeadCard");
var shoulderCard = document.getElementById("jsShoulderCard");
var legCard = document.getElementById("jsLegCard");
var posture = {
  isGoodShoulderPosture: false,
  isGoodHeadPosture: false,
  isGoodLegPosture: false,
  isGoodPosture: false,
  isStanding: false
};

function setup() {
  var myCanvas = createCanvas(640, 480);
  myCanvas.parent("jsWebcamContainer");
  video = createCapture(VIDEO);
  video.size(width, height); // Create a new poseNet method with a single detection

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.detectionType = "single"; // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected

  poseNet.on("pose", gotPoses); // Hide the video element, and just show the canvas

  video.hide();
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelReady() {
  select("#status").html("Model Loaded");
  document.getElementById("jsLoagingcard").classList.add("loaded");
}

function draw() {
  image(video, 0, 0, width, height);
  postureAlgorithm();
  postureStatistics(); // We can call both functions to draw all keypoints and the skeletons

  if (pose) {
    drawKeypoints();
    drawSkeleton();
  }
} // A function to draw ellipses over the detected keypoints


function drawKeypoints() {
  for (var i = 0; i < pose.keypoints.length; i++) {
    // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    var keypoint = pose.keypoints[i]; // Only draw an ellipse is the pose probability is bigger than 0.2

    if (keypoint.score > 0.2) {
      fill(255, 255, 255);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      fill(0, 0, 0);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 8, 8);
    }
  }
} // A function to draw the skeletons


function drawSkeleton() {
  // For every skeleton, loop through all body connections
  for (var i = 0; i < skeleton.length; i++) {
    var partA = skeleton[i][0];
    var partB = skeleton[i][1];
    strokeWeight(2);
    stroke(0, 0, 0);
    line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
  }
}

function postureAlgorithm() {
  if (!pose) {
    posture.isStanding = true;
  } else {
    // 0	nose
    // 1	leftEye
    // 2	rightEye
    // 3	leftEar
    // 4	rightEar
    // 5	leftShoulder
    // 6	rightShoulder
    // 7	leftElbow
    // 8	rightElbow
    // 9	leftWrist
    // 10	rightWrist
    // 11	leftHip
    // 12	rightHip
    // 13	leftKnee
    // 14	rightKnee
    // 15	leftAnkle
    // 16	rightAnkle
    var nose = pose.keypoints[0];
    var leftEye = pose.keypoints[1];
    var rightEye = pose.keypoints[2];
    var leftEar = pose.keypoints[3];
    var rightEar = pose.keypoints[4];
    var leftShoulder = pose.keypoints[5];
    var rightShoulder = pose.keypoints[6];
    var leftElbow = pose.keypoints[7];
    var rightElbow = pose.keypoints[8];
    var leftWrist = pose.keypoints[9];
    var rightWrist = pose.keypoints[10];
    var leftHip = pose.keypoints[11];
    var rightHip = pose.keypoints[12];
    var leftKnee = pose.keypoints[13];
    var rightKnee = pose.keypoints[14];
    var leftAnkle = pose.keypoints[15];
    var rightAnkle = pose.keypoints[16]; // Detect side

    var isRightSide = false;

    if (rightEar.score > leftEar.score) {
      isRightSide = true;
    } else {
      isRightSide = false;
    } // Set dominant parts


    var dominantShoulder;
    var dominantHip;
    var dominantEar;
    var dominantKnee;
    var dominantAnkle;
    var dominantEye; // Detect side

    if (isRightSide) {
      dominantShoulder = rightShoulder;
      dominantHip = rightHip;
      dominantEar = rightEar;
      dominantKnee = rightKnee;
      dominantAnkle = rightAnkle;
      dominantEye = rightEye;
    } else {
      dominantShoulder = leftShoulder;
      dominantHip = leftHip;
      dominantEar = rightEar;
      dominantKnee = leftKnee;
      dominantAnkle = leftAnkle;
      dominantEye = leftEye;
    }

    var yDistanceBetweenHeadandHip = dominantEye.position.y - dominantHip.position.y;
    var yDistanceBetweenShoulderandHip = dominantShoulder.position.y - dominantHip.position.y;
    var shoulderToHipDifferenceX = dominantShoulder.position.x - dominantHip.position.x;
    var earToShoulderDifferenceX = dominantEar.position.x - dominantShoulder.position.x;
    var kneeToHipDifferenceY = dominantHip.position.y - dominantKnee.position.y; // Set isGoodShoulderPosture

    if (abs(shoulderToHipDifferenceX) < 30) {
      posture.isGoodShoulderPosture = true;
    } else {
      posture.isGoodShoulderPosture = false;
    } // Set isGoodHeadPosture


    if (abs(yDistanceBetweenShoulderandHip / yDistanceBetweenHeadandHip) < 0.725) {
      posture.isGoodHeadPosture = true;
    } else {
      posture.isGoodHeadPosture = false;
    }

    if (posture.isGoodShoulderPosture && posture.isGoodHeadPosture && posture.isGoodLegPosture) {
      posture.isGoodPosture = true;
    } else {
      posture.isGoodPosture = false;
    } // Set isGoodAnklePosture


    if (abs(earToShoulderDifferenceX) < 30) {
      posture.isGoodHeadPosture = true;
    } else {
      posture.isGoodHeadPosture = false;
    } // Set isGoodLegPosture


    if (abs(kneeToHipDifferenceY) < 30) {
      posture.isGoodLegPosture = true;
    } else {
      posture.isGoodLegPosture = false;
    } // Detect if standing


    averageHipPositionY = (leftHip.position.y + rightHip.position.y) / 2;
    averageKneePositionY = (leftKnee.position.y + rightKnee.position.y) / 2;
    differenceBetweenAverageHipAndKneePositionY = averageHipPositionY - averageKneePositionY;

    if (abs(differenceBetweenAverageHipAndKneePositionY) > 100) {
      posture.isStanding = true;
    } else {
      posture.isStanding = false;
    }
  }
}

function postureStatistics() {
  // Shoulder card
  if (shoulderCard) {
    if (!posture.isGoodShoulderPosture) {
      document.getElementById("jsShoulderCard").classList.add("bg-danger");
      document.getElementById("resultShoulderText").innerHTML = "Keep your spine straight and your shoulders back.";
    } else {
      document.getElementById("jsShoulderCard").classList.remove("bg-danger");
      document.getElementById("resultShoulderText").innerHTML = "Good Posture!";
    }
  } // Head card


  if (headCard) {
    if (!posture.isGoodHeadPosture) {
      document.getElementById("jsHeadCard").classList.add("bg-danger");
      document.getElementById("resultHeadText").innerHTML = "Keep your head up and your eyes level.";
    } else {
      document.getElementById("jsHeadCard").classList.remove("bg-danger");
      document.getElementById("resultHeadText").innerHTML = "Good Posture!";
    }
  } // Legs card


  if (legCard) {
    if (!posture.isGoodLegPosture) {
      document.getElementById("jsLegCard").classList.add("bg-danger");
      document.getElementById("resultLegText").innerHTML = "Keep your legs parallel to the floor.";
    } else {
      document.getElementById("jsLegCard").classList.remove("bg-danger");
      document.getElementById("resultLegText").innerHTML = "Good Posture!";
    }
  }
}