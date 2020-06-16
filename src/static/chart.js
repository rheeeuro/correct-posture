const userChart = document.getElementById("userChart");

const chartTotal = document.getElementById("jsChartTotal");
const chartHead = document.getElementById("jsChartHead");
const chartShoulder = document.getElementById("jsChartShoulder");
const chartLeg = document.getElementById("jsChartLeg");

if (userChart) {
  const ctxTotal = chartTotal.getContext("2d");
  const ctxHead = chartHead.getContext("2d");
  const ctxShoulder = chartShoulder.getContext("2d");
  const ctxLeg = chartLeg.getContext("2d");

  const totalGoodTime = document.getElementById("totalGoodTime").value;
  const totalBadTime = document.getElementById("totalBadTime").value;
  const headGoodTime = document.getElementById("headGoodTime").value;
  const headBadTime = document.getElementById("headBadTime").value;
  const shoulderGoodTime = document.getElementById("shoulderGoodTime").value;
  const shoulderBadTime = document.getElementById("shoulderBadTime").value;
  const legGoodTime = document.getElementById("legGoodTime").value;
  const legBadTime = document.getElementById("legBadTime").value;

  let pieTotal = new Chart(ctxTotal, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [totalGoodTime, totalBadTime],
          backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        },
      ],
      labels: ["Good Total Posture", "Bad Total Posture"],
    },
    options: {
      responsive: false,
    },
  });
  let pieHead = new Chart(ctxHead, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [headGoodTime, headBadTime],
          backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        },
      ],
      labels: ["Good Head Posture", "Bad Head Posture"],
    },
    options: {
      responsive: false,
    },
  });
  let pieShoulder = new Chart(ctxShoulder, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [shoulderGoodTime, shoulderBadTime],
          backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        },
      ],
      labels: ["Good Shoulder Posture", "Bad Shoulder Posture"],
    },
    options: {
      responsive: false,
    },
  });
  let pieLeg = new Chart(ctxLeg, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [legGoodTime, legBadTime],
          backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
        },
      ],
      labels: ["Good Leg Posture", "Bad Leg Posture"],
    },
    options: {
      responsive: false,
    },
  });
}
