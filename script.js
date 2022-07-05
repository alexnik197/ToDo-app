"use strict";

// GLOBAL VARIABLES
const modal = document.querySelector(".modal");
const btnCreateTask = document.querySelectorAll("#btnCreateTask");
const btnAdd = document.querySelector("#btnAdd");
const inputAdd = document.querySelector("#inputAdd");
const list = document.querySelector(".list");
const listItems = document.querySelector("#listItems");
const addCategory = document.querySelector(".add-category");
const parag = document.querySelectorAll("p");
const taskInnerText = document.querySelector(".task-text");

// GLOBAL FUNCTIONS
const closeModal = () => modal.classList.remove("modal-open");
const inputText = function () {
  const inputVal = inputAdd.value;
  inputAdd.value = "";
  addElement(inputVal);
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

// SAVE INPUT TEXT
btnAdd.addEventListener("click", function () {
  inputText();
  closeModal();
});

// ACTIONS WITH KEYBOARD
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && modal.classList.contains("modal-open")) {
    closeModal();
  } else if (e.key == "Enter") {
    inputText();
    closeModal();
  }
});

// ADD TASK
function addElement(e) {
  if (e === "") return;

  const newTask = document.createElement("div");
  const imgComplete = document.createElement("img");
  const textTask = document.createElement("p");
  const removeTask = function () {
    newTask.remove();
  };

  newTask.className = "task";
  textTask.className = "task-text";
  imgComplete.className = "complete";
  imgComplete.src = "svg/complete.svg";

  textTask.textContent = e;

  listItems.appendChild(newTask);
  newTask.appendChild(imgComplete);
  newTask.appendChild(textTask);

  imgComplete.addEventListener("click", function () {
    imgComplete.className = "complete-done";
    textTask.className = "text-done";

    imgComplete.addEventListener("click", function () {
      if (imgComplete.classList.contains("complete-done")) {
        const listCoord = listItems.getBoundingClientRect();
        const taskCoord = newTask.getBoundingClientRect();
        const newCoord = listCoord.top - taskCoord.top;
        newTask.className = "task-done";
        newTask.style.top = `${Math.abs(newCoord)}px`;
        setTimeout(removeTask, 500);
      }
    });
  });
}

// FOOTER RESULTS
const totalNum = document.querySelector("#totalNum");

// EDIT TEXT
parag.forEach(function (el) {
  el.addEventListener("click", function () {
    if (el.classList.contains("task-text")) {
      console.log("hi");
    }
  });
});
