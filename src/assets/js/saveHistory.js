import axios from "axios";

const exerciseContainer = document.getElementById("jsExerciseContainer");
const saveButton = document.getElementById("saveButton");
const redirectButton = document.getElementById("redirectButton");
const setCount = document.getElementById("setCount");

const jsImage = document.getElementById("exerciseImage");
const jsCanvas = document.getElementById("exerciseCanvas");
const countInfo = document.getElementById("jsCountInfo");

const handleRedirect = () => {
  location.reload();
};

const addHistory = async (id, set) => {
  const response = await axios({
    url: `/api/${id}/save-history`,
    method: "POST",
    data: {
      set,
    },
  });
  if (response.status === 200) {
    console.log("save success!");
  }
};

const handleSave = () => {
  console.log("save staert");
  const exerciseId = window.location.href.split("/posture/")[1];
  const set = parseInt(setCount.innerHTML.split(": ")[1], 10);
  console.log(exerciseId);
  console.log(set);
  if (set > 0) {
    addHistory(exerciseId, set);
  }
};

if (exerciseContainer) {
  redirectButton.addEventListener("click", handleRedirect);
  saveButton.addEventListener("click", handleSave);
}
