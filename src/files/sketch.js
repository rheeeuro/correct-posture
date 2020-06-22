/*eslint-disable */

let video;
let poseNet;
let pose;
let skeleton;

const resultCard = document.getElementById("jsResultCard");
const headCard = document.getElementById("jsHeadCard");
const shoulderCard = document.getElementById("jsShoulderCard");
const legCard = document.getElementById("jsLegCard");

const inputTotal = document.getElementById("goodTotal");
const inputHead = document.getElementById("goodHead");
const inputShoulder = document.getElementById("goodShoulder");
const inputLeg = document.getElementById("goodLeg");

let posture = {
  isGoodShoulderPosture: false,
  isGoodHeadPosture: false,
  isGoodLegPosture: false,
  isGoodPosture: false,
  isStanding: false,
  isLegExist: false,
};
let statistics = {
  goodHeadCount: 0,
  badHeadCount: 0,
  goodShoulderCount: 0,
  badShoulderCount: 0,
  goodLegCount: 0,
  badLegCount: 0,
};

function setup() {
  let myCanvas = createCanvas(640, 480);
  myCanvas.parent("jsWebcamContainer");
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.detectionType = "single";
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", gotPoses);
  // Hide the video element, and just show the canvas
  video.hide();
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelReady() {
  document.getElementById("jsOverlay").style.display = "none";
  document.getElementById("jsLoading").style.display = "none";
}

function draw() {
  image(video, 0, 0, width, height);

  postureAlgorithm();
  postureStatistics();

  // We can call both functions to draw all keypoints and the skeletons
  if (pose) {
    drawKeypoints();
    drawSkeleton();
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < pose.keypoints.length; i++) {
    // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    let keypoint = pose.keypoints[i];
    // Only draw an ellipse is the pose probability is bigger than 0.2
    if (keypoint.score > 0.2) {
      fill(255, 255, 255);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      fill(0, 0, 0);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 8, 8);
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // For every skeleton, loop through all body connections
  for (let i = 0; i < skeleton.length; i++) {
    let partA = skeleton[i][0];
    let partB = skeleton[i][1];

    strokeWeight(2);
    stroke(0, 0, 0);
    line(
      partA.position.x,
      partA.position.y,
      partB.position.x,
      partB.position.y
    );
  }
}

function postureStatistics() {
  // Head card
  if (headCard) {
    if (!posture.isGoodHeadPosture) {
      headCard.classList.add("bg-danger");
      headCard.classList.remove("bg-good");
      document.getElementById("resultHeadText").innerHTML =
        "Keep your head up and your eyes level.";
      statistics.badHeadCount += 1;
    } else {
      headCard.classList.add("bg-good");
      headCard.classList.remove("bg-danger");
      document.getElementById("resultHeadText").innerHTML = "Good Posture!";
      statistics.goodHeadCount += 1;
    }
  }

  // Shoulder card
  if (shoulderCard) {
    if (!posture.isGoodShoulderPosture) {
      shoulderCard.classList.add("bg-danger");
      shoulderCard.classList.remove("bg-good");
      document.getElementById("resultShoulderText").innerHTML =
        "Keep your spine straight and your shoulders back.";
      statistics.badShoulderCount += 1;
    } else {
      shoulderCard.classList.add("bg-good");
      shoulderCard.classList.remove("bg-danger");
      document.getElementById("resultShoulderText").innerHTML = "Good Posture!";
      statistics.goodShoulderCount += 1;
    }
  }

  // Legs card
  if (legCard) {
    if (posture.isLegExist) {
      if (!posture.isGoodLegPosture) {
        legCard.classList.add("bg-danger");
        legCard.classList.remove("bg-notExist");
        legCard.classList.remove("bg-good");
        document.getElementById("resultLegText").innerHTML =
          "Keep your legs parallel to the floor.";
        statistics.badLegCount += 1;
      } else {
        legCard.classList.add("bg-good");
        legCard.classList.remove("bg-danger");
        legCard.classList.remove("bg-notExist");
        document.getElementById("resultLegText").innerHTML = "Good Posture!";
        statistics.goodLegCount += 1;
      }
    } else {
      legCard.classList.add("bg-notExist");
      legCard.classList.remove("bg-danger");
      legCard.classList.remove("bg-good");
      document.getElementById("resultLegText").innerHTML =
        "Legs doen not detected";
    }
  }

  if (resultCard) {
    if (posture.isLegExist) {
      if (
        posture.isGoodHeadPosture &&
        posture.isGoodShoulderPosture &&
        posture.isGoodLegPosture
      ) {
        resultCard.classList.add("bg-good");
        resultCard.classList.remove("bg-danger");
        document.getElementById("reaultText").innerHTML = "Good Posture!";
      } else {
        resultCard.classList.add("bg-danger");
        resultCard.classList.remove("bg-good");
        document.getElementById("reaultText").innerHTML =
          "Your posture is not good.";
      }
    } else {
      if (posture.isGoodHeadPosture && posture.isGoodShoulderPosture) {
        resultCard.classList.add("bg-good");
        resultCard.classList.remove("bg-danger");
        document.getElementById("reaultText").innerHTML = "Good Posture!";
      } else {
        resultCard.classList.add("bg-danger");
        resultCard.classList.remove("bg-good");
        document.getElementById("reaultText").innerHTML =
          "Your posture is not good.";
      }
    }
  }
}

if (inputTotal && inputHead && inputShoulder && inputLeg) {
  setInterval(postureChart, 1000);
}

function postureChart() {
  let goodTotal = false;
  let goodHead = false;
  let goodShoulder = false;
  let goodLeg = false;

  // count total
  let totalGoodCount = 0;
  let totalBadCount = 0;
  totalGoodCount =
    statistics.goodHeadCount +
    statistics.goodShoulderCount +
    statistics.goodLegCount;
  totalBadCount =
    statistics.badHeadCount +
    statistics.badShoulderCount +
    statistics.badLegCount;

  // Decide good or bad
  if (totalGoodCount > totalBadCount) {
    goodTotal = true;
  }
  if (statistics.goodHeadCount > statistics.badHeadCount) {
    goodHead = true;
  }
  if (statistics.goodShoulderCount > statistics.badShoulderCount) {
    goodShoulder = true;
  }
  if (statistics.goodLegCount > statistics.badLegCount) {
    goodLeg = true;
  }

  if (goodTotal) {
    inputTotal.value = "true";
  } else {
    inputTotal.value = "false";
  }

  if (goodHead) {
    inputHead.value = "true";
  } else {
    inputHead.value = "false";
  }

  if (goodShoulder) {
    inputShoulder.value = "true";
  } else {
    inputShoulder.value = "false";
  }

  if (statistics.goodLegCount === 0 && statistics.badLegCount === 0) {
    inputLeg.value = "none";
  } else {
    if (goodLeg) {
      inputLeg.value = "true";
    } else {
      inputLeg.value = "false";
    }
  }

  // reset
  statistics.goodHeadCount = 0;
  statistics.badHeadCount = 0;
  statistics.goodShoulderCount = 0;
  statistics.badShoulderCount = 0;
  statistics.goodLegCount = 0;
  statistics.badLegCount = 0;
}

function postureAlgorithm() {
  if (pose) {
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

    let nose = pose.keypoints[0];
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    let leftEar = pose.keypoints[3];
    let rightEar = pose.keypoints[4];
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];
    let leftKnee = pose.keypoints[13];
    let rightKnee = pose.keypoints[14];
    let leftAnkle = pose.keypoints[15];
    let rightAnkle = pose.keypoints[16];

    // Detect side
    let side = 0;
    if (leftEar.score - rightEar.score > 0.5) {
      side = 1; // left side
    } else if (leftEar.score - rightEar.score < -0.5) {
      side = -1; // right side
    } else {
      side = 0; // front side
    }

    // Detect Leg
    if (
      leftHip.score > 0.5 &&
      rightHip.score > 0.5 &&
      leftKnee.score > 0.5 &&
      rightKnee.score > 0.5
    ) {
      posture.isLegExist = true;
    } else {
      posture.isLegExist = false;
    }

    // Detect Standing
    if (posture.isLegExist) {
      let averageHipPositionY = (leftHip.position.y + rightHip.position.y) / 2;
      let averageKneePositionY =
        (leftKnee.position.y + rightKnee.position.y) / 2;
      let averageShoulderPositionY =
        (leftShoulder.position.y + rightShoulder.position.y) / 2;

      let differenceBetweenAverageShoudlerAndHipPositionY =
        averageShoulderPositionY - averageHipPositionY;
      let differenceBetweenAverageHipAndKneePositionY =
        averageHipPositionY - averageKneePositionY;

      if (
        abs(differenceBetweenAverageHipAndKneePositionY) >
        abs(differenceBetweenAverageShoudlerAndHipPositionY) * 0.7
      ) {
        posture.isStanding = true;
      } else {
        posture.isStanding = false;
      }
    }
    if (side === 0) {
      // front side ----------------------------------------------------------------

      // front head
      let isGoodLeftHead = false;
      let isGoodRightHead = false;
      let isGoodEarHeight = false;
      let averageEyePositionY = (leftEye.position.y + rightEye.position.y) / 2;

      if (abs(averageEyePositionY - nose.position.y) < 10) {
        isGoodLeftHead = true;
        isGoodRightHead = true;
      } else {
        if (
          nose.position.y > leftEar.position.y &&
          leftEar.position.y > leftEye.position.y
        ) {
          isGoodLeftHead = true;
        }

        if (
          nose.position.y > rightEar.position.y &&
          rightEar.position.y > rightEye.position.y
        ) {
          isGoodRightHead = true;
        }
      }

      if (abs(leftEar.position.y - rightEar.position.y) < 20) {
        isGoodEarHeight = true;
      }

      if (isGoodLeftHead && isGoodRightHead && isGoodEarHeight) {
        posture.isGoodHeadPosture = true;
      } else {
        posture.isGoodHeadPosture = false;
      }

      // front shoulder
      if (abs(leftShoulder.position.y - rightShoulder.position.y) < 25) {
        posture.isGoodShoulderPosture = true;
      } else {
        posture.isGoodShoulderPosture = false;
      }

      // front leg
      if (posture.isLegExist) {
        let isGoodLeftLeg = false;
        let isGoodRightLeg = false;

        if (leftAnkle.confidence > 0.5 && rightAnkle.confidence > 0.5) {
          if (
            leftShoulder.position.x > leftAnkle.position.x &&
            leftAnkle.position.x > rightHip.position.x
          ) {
            isGoodLeftLeg = true;
          }
          if (
            rightShoulder.position.x < rightAnkle.position.x &&
            rightAnkle.position.x < leftHip.position.x
          ) {
            isGoodRightLeg = true;
          }
        } else {
          if (
            leftShoulder.position.x > leftKnee.position.x &&
            leftKnee.position.x > rightHip.position.x
          ) {
            isGoodLeftLeg = true;
          }
          if (
            rightShoulder.position.x < rightKnee.position.x &&
            rightKnee.position.x < leftHip.position.x
          ) {
            isGoodRightLeg = true;
          }
        }

        if (isGoodLeftLeg && isGoodRightLeg) {
          posture.isGoodLegPosture = true;
        } else {
          posture.isGoodLegPosture = false;
        }
      }
      // end front
    } else {
      // side----------------------------------------------
      // Set dominant parts
      let dominantShoulder;
      let dominantHip;
      let dominantEar;
      let dominantKnee;
      let dominantAnkle;
      let dominantEye;

      // Detect side
      if (side == -1) {
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

      // side head
      let isGoodDominantHead = false;
      let isGoodNeck = false;
      if (
        nose.position.y > dominantEar.position.y &&
        nose.position.y > dominantEye.position.y
      ) {
        isGoodDominantHead = true;
      }

      if (abs(dominantEar.position.x - dominantShoulder.position.x) < 30) {
        isGoodNeck = true;
      }

      if (isGoodDominantHead && isGoodNeck) {
        posture.isGoodHeadPosture = true;
      } else {
        posture.isGoodHeadPosture = false;
      }

      // side shoulder
      if (leftShoulder.score > 0.5 && rightShoulder.score > 0.5) {
        if (abs(leftShoulder.position.y - rightShoulder.position.y) < 25) {
          posture.isGoodShoulderPosture = true;
        } else {
          posture.isGoodShoulderPosture = false;
        }
      } else {
        posture.isGoodShoulderPosture = true;
      }

      // side leg
      if (posture.isLegExist) {
        let isGoodDominantLeg = false;
        let isGoodDominantSitting = false;
        if (posture.isStanding) {
          if (dominantAnkle.confidence > 0.5) {
            if (
              abs(dominantAnkle.position.x - dominantShoulder.position.x) < 30
            ) {
              isGoodDominantLeg = true;
            }
          } else {
            if (
              abs(dominantKnee.position.x - dominantShoulder.position.x) < 30
            ) {
              isGoodDominantLeg = true;
            }
          }
        } else {
          // sit
          if (dominantAnkle.confidence > 0.5) {
            if (
              abs(dominantAnkle.position.x - dominantKnee.position.x) < 30 &&
              abs(dominantKnee.position.y - dominantHip.position.y) < 30
            ) {
              isGoodDominantSitting = true;
            }
          } else {
            if (abs(dominantKnee.position.y - dominantHip.position.y) < 30) {
              isGoodDominantSitting = true;
            }
          }
        }
        if (isGoodDominantLeg && isGoodDominantSitting) {
          posture.isGoodLegPosture = true;
        } else {
          posture.isGoodLegPosture = false;
        }
      }
      // end side
    }
  }
}

module.exports = postureAlgorithm;
