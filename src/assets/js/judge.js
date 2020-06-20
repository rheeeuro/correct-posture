import axios from "axios";

const btnContainer = document.getElementById("jsBtnContainer");
const judgeAnchor = document.getElementById("jsJudgeAnchor");
const judgeBtn = document.getElementById("jsJudgeBtn");

const inputTotal = document.getElementById("goodTotal");
const inputHead = document.getElementById("goodHead");
const inputShoulder = document.getElementById("goodShoulder");
const inputLeg = document.getElementById("goodLeg");

const totalBar = document.getElementById("jsTotalBar");
const headBar = document.getElementById("jsHeadBar");
const shoulderBar = document.getElementById("jsShoulderBar");
const legBar = document.getElementById("jsLegBar");

const id = document.getElementById("userId");

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
  percentTotal: 0,
  percentHead: 0,
  percentShoulder: 0,
  percentLeg: 0,
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

  count.percentTotal = Math.round(
    100 * (count.goodTotal / (count.goodTotal + count.badTotal))
  );
  count.percentHead = Math.round(
    100 * (count.goodHead / (count.goodHead + count.badHead))
  );
  count.percentShoulder = Math.round(
    100 * (count.goodShoulder / (count.goodShoulder + count.badShoulder))
  );
  count.percentLeg = Math.round(
    100 * (count.goodLeg / (count.goodLeg + count.badLeg))
  );

  totalBar.style.width = `${count.percentTotal}%`;
  headBar.style.width = `${count.percentHead}%`;
  shoulderBar.style.width = `${count.percentShoulder}%`;
  legBar.style.width = `${count.percentLeg}%`;

  if (count.percentTotal >= 5) {
    totalBar.innerHTML = `${count.percentTotal}%`;
  } else {
    totalBar.innerHTML = "";
  }
  if (count.percentHead >= 5) {
    headBar.innerHTML = `${count.percentHead}%`;
  } else {
    headBar.innerHTML = "";
  }
  if (count.percentShoulder >= 5) {
    shoulderBar.innerHTML = `${count.percentShoulder}%`;
  } else {
    shoulderBar.innerHTML = "";
  }
  if (count.percentLeg >= 5) {
    legBar.innerHTML = `${count.percentLeg}%`;
  } else {
    legBar.innerHTML = "";
  }
};

const handleSave = () => {
  clearInterval(intervalId);
  if (id) {
    saveStatistics();
  }

  // recommend type
  let recommend = 0;
  if (count.goodLeg !== 0 || count.badLeg !== 0) {
    if (
      count.percentHead < count.percentShoulder &&
      count.percentHead < count.percentLeg &&
      count.percentHead < 70
    ) {
      recommend = 1;
    } else if (
      count.percentShoulder < count.percentHead &&
      count.percentShoulder < count.percentLeg &&
      count.percentShoulder < 70
    ) {
      recommend = 2;
    } else if (
      count.percentLeg < count.percentHead &&
      count.percentLeg < count.percentShoulder &&
      count.percentLeg < 70
    ) {
      recommend = 3;
    }
  } else if (
    count.percentHead < count.percentShoulder &&
    count.percentHead < 70
  ) {
    recommend = 1;
  } else if (
    count.percentShoulder < count.percentHead &&
    count.percentShoulder < 70
  ) {
    recommend = 2;
  }

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
  judgeAnchor.href = `/posture/recommend/${recommend}`;
  judgeAnchor.click();
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
  const div = document.createElement("div");
  div.classList.add("fill-one");
  judgeBtn.appendChild(div);

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
