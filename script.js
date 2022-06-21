"use strict";

const modal = document.querySelector(".modal");
const btnCreateTask = document.querySelectorAll("#btnCreateTask");
const btnAdd = document.querySelector("#btnAdd");
const inputAdd = document.querySelector("#inputAdd");
const list = document.querySelector("#list");
const closeModal = function () {
  modal.classList.remove("modal-open");
};

// // OPEN MODAL
btnCreateTask.forEach(function (el) {
  el.addEventListener("click", function () {
    modal.classList.add("modal-open");
  });
});

// // CLOSE MODAL
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

btnAdd.addEventListener("click", function () {
  const inputVal = inputAdd.value;
  inputAdd.value = "";
  addElement(inputVal);
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    if (modal.classList.contains("modal-open")) {
      closeModal();
    }
  }
});

// ADD TASK
function addElement(e) {
  if (e === "") return;
  const newTask = document.createElement("div");
  newTask.className = "task";
  list.appendChild(newTask);
  newTask.innerHTML += `<img src="svg/complete.svg" alt="complete" class="complete"><p>${e}</p>`;
}
