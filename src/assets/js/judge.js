import axios from "axios";

const btnContainer = document.getElementById("jsBtnContainer");
const judgeAnchor = document.getElementById("jsJudgeAnchor");
const judgeBtn = document.getElementById("jsJudgeBtn");

const TotalStat = document.getElementById("jsTotalStat");
const HeadStat = document.getElementById("jsHeadStat");
const ShoulderStat = document.getElementById("jsShoulderStat");
const LegStat = document.getElementById("jsLegStat");

const inputTotal = document.getElementById("goodTotal");
const inputHead = document.getElementById("goodHead");
const inputShoulder = document.getElementById("goodShoulder");
const inputLeg = document.getElementById("goodLeg");

const totalBar = document.getElementById("jsTotalBar");
const headBar = document.getElementById("jsHeadBar");
const shoulderBar = document.getElementById("jsShoulderBar");
const legBar = document.getElementById("jsLegBar");

let intervalId;
let count = {
  goodTotal: 0,
  badTotal: 0,
  goodHead: 0,
  badHead: 0,
  goodShoulder: 0,
  badShoulder: 0,
  goodLeg: 0,
  badLeg: 0,
};

const saveStatistics = async () => {
  const response = await axios({
    url: "/api/save-statistics",
    method: "POST",
    data: {
      goodTotal: count.goodTotal,
      badTotal: count.badTotal,
      goodHead: count.goodHead,
      badHead: count.badHead,
      goodShoulder: count.goodShoulder,
      badShoulder: count.badShoulder,
      goodLeg: count.goodLeg,
      badLeg: count.badLeg,
    },
  });
  if (response.status === 200) {
    console.log("save success!");
  }
};

const countFunction = () => {
  if (inputTotal.value === "true") {
    count.goodTotal += 1;
  } else {
    count.badTotal += 1;
  }

  if (inputHead.value === "true") {
    count.goodHead += 1;
  } else {
    count.badHead += 1;
  }

  if (inputShoulder.value === "true") {
    count.goodShoulder += 1;
  } else {
    count.badShoulder += 1;
  }

  if (inputLeg.value === "true") {
    count.goodLeg += 1;
  } else if (inputLeg.value === "false") {
    count.badLeg += 1;
  }

  const percentTotal = Math.round(
    100 * (count.goodTotal / (count.goodTotal + count.badTotal))
  );
  const percentHead = Math.round(
    100 * (count.goodHead / (count.goodHead + count.badHead))
  );
  const percentShoulder = Math.round(
    100 * (count.goodShoulder / (count.goodShoulder + count.badShoulder))
  );
  const percentLeg = Math.round(
    100 * (count.goodLeg / (count.goodLeg + count.badLeg))
  );

  totalBar.style.width = `${percentTotal}%`;
  headBar.style.width = `${percentHead}%`;
  shoulderBar.style.width = `${percentShoulder}%`;
  legBar.style.width = `${percentLeg}%`;

  if (percentTotal >= 5) {
    totalBar.innerHTML = `${percentTotal}%`;
  } else {
    totalBar.innerHTML = "";
  }
  if (percentHead >= 5) {
    headBar.innerHTML = `${percentHead}%`;
  } else {
    headBar.innerHTML = "";
  }
  if (percentShoulder >= 5) {
    shoulderBar.innerHTML = `${percentShoulder}%`;
  } else {
    shoulderBar.innerHTML = "";
  }
  if (percentLeg >= 5) {
    legBar.innerHTML = `${percentLeg}%`;
  } else {
    legBar.innerHTML = "";
  }
};

const handleSave = () => {
  clearInterval(intervalId);
  saveStatistics();

  // reset width
  totalBar.style.width = "100%";
  headBar.style.width = "100%";
  shoulderBar.style.width = "100%";
  legBar.style.width = "100%";

  // change view
  judgeBtn.innerHTML = "Judge Start!";
  totalBar.innerHTML = "Total Statistics";
  headBar.innerHTML = "Head Statistics";
  shoulderBar.innerHTML = "Shoulder Statistics";
  legBar.innerHTML = "Leg Statistics";

  // reset
  count.goodTotal = 0;
  count.badTotal = 0;
  count.goodHead = 0;
  count.badHead = 0;
  count.goodShoulder = 0;
  count.badShoulder = 0;
  count.goodLeg = 0;
  count.badLeg = 0;

  // change event listener
  judgeAnchor.removeEventListener("click", handleSave);
  judgeAnchor.addEventListener("click", handleStart);
};

const handleStart = () => {
  // notice start
  intervalId = setInterval(countFunction, 1000);

  // change view
  judgeBtn.innerHTML = "Save Judge!";
  totalBar.innerHTML = "";
  headBar.innerHTML = "";
  shoulderBar.innerHTML = "";
  legBar.innerHTML = "";

  // change event listener
  judgeAnchor.removeEventListener("click", handleStart);
  judgeAnchor.addEventListener("click", handleSave);
};

function init() {
  judgeAnchor.addEventListener("click", handleStart);
}

if (btnContainer) {
  init();
}
