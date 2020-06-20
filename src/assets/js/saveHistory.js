import axios from "axios";

const exerciseContainer = document.getElementById("jsExerciseContainer");
const saveButton = document.getElementById("saveButton");
const redirectButton = document.getElementById("redirectButton");
const setCount = document.getElementById("setCount");

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
  const exerciseId = window.location.href.split("/posture/")[1];
  const set = parseInt(setCount.innerHTML.split(": ")[1], 10);
  if (set > 0) {
    addHistory(exerciseId, set);
  }
  setTimeout(handleRedirect, 2000);
};

if (exerciseContainer) {
  redirectButton.addEventListener("click", handleRedirect);
  saveButton.addEventListener("click", handleSave);
}
