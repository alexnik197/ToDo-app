"use strict";

const task1 = {
  text: "test1",
  id: 1,
};

const task2 = {
  text: "test2",
  id: 2,
};

const task3 = {
  text: "test3",
  id: 3,
};

const allTasks = [task1, task2, task3];

// GLOBAL VARIABLES
const modalNew = document.querySelector(".modalNew");
const modalRew = document.querySelector(".modalRew");
const btnCreateTask = document.querySelectorAll("#btnCreateTask");
const btnAdd = document.querySelector("#btnAdd");
const btnRew = document.querySelector("#btnRew");
const inputAdd = document.querySelector("#inputAdd");
const inputRew = document.querySelector("#inputRew");
const list = document.querySelector(".list");
const listItems = document.querySelector("#listItems");
const addCategory = document.querySelector(".add-category");
const parag = document.querySelectorAll("p");
const taskInnerText = document.querySelector(".task-text");
const totalNum = document.querySelector("#totalNum");

// GLOBAL FUNCTIONS
const closeModal = () => modalNew.classList.remove("modal-open");
const inputText = function () {
  inputAdd.value = "";
};

// UPDATE TOTAL TASKS QUANTITY FUNCTION
const totalTask = function () {
  totalNum.textContent = `${allTasks.length}`;
};

// SHOW TASK FUNCTION
const showTasks = function (allT) {
  allT.forEach(function (task) {
    const taskHTML = `
    <div class="task" id="task-div">
    <img class="complete" id="task-img" src="svg/complete.svg">
    <p class="task-text">${task.text}</p>
    </div>`;
    listItems.insertAdjacentHTML("afterbegin", taskHTML);
  });
};

totalTask();
showTasks(allTasks);

// // OPEN MODAL
const openModal = function () {
  btnCreateTask.forEach(function (el) {
    el.addEventListener("click", function () {
      modalNew.classList.add("modal-open");
    });
  });
};
openModal();

// CREATE A TASK
btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputAdd.value) {
    const task = {};
    const prefix = allTasks.length + 1;
    task[prefix];

    task.text = inputAdd.value;
    task.id = allTasks.length + 1;

    allTasks.push(task);

    const taskHTML = `
    <div class="task" id="task-div">
    <img class="complete" src="svg/complete.svg" id="task-img">
    <p class="task-text">${task.text}</p>
    </div>`;
    listItems.insertAdjacentHTML("afterbegin", taskHTML);

    inputAdd.value = "";

    modalNew.classList.remove("modal-open");
    totalTask();
  } else {
    alert(`Пустое поле!`);
  }
});

// // MARK A TASK AS COMPLETE
// document.querySelector("#taskMark").addEventListener("click", function () {
//   document.querySelector(".complete").className = "complete-done";
//   document.querySelector(".task-text").className = "text-done";
// });
// // markTask.addEventListener("click", function () {
// //   complete.className = "complete-done";
// //   textTask.className = "text-done";
// //   // markTask.addEventListener("click", function () {
// //   //   if (markTask.classList.contains("complete-done")) {
// //   //     const listCoord = listItems.getBoundingClientRect();
// //   //     const taskCoord = newTask.getBoundingClientRect();
// //   //     const newCoord = listCoord.top - taskCoord.top;
// //   //     newTask.className = "task-done";
// //   //     newTask.style.top = `${Math.abs(newCoord)}px`;
// //   //     setTimeout(removeTask, 500);
// //   //   }
// //   // });
// // });

// // CLOSE MODAL
modalNew.addEventListener("click", function (e) {
  if (e.target === modalNew) {
    closeModal();
  }
});

// ACTIONS WITH KEYBOARD
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && modalNew.classList.contains("modal-open")) {
    closeModal();
  } else if (e.key == "Enter") {
    inputText();
    closeModal();
  }
});

const allMarks = document.querySelectorAll("#task-img");
const allText = document.querySelectorAll(".task-text");

// CREATE CHANGE TEXT FUNCTION
allText.forEach(function (currentText) {
  currentText.addEventListener("click", function () {
    modalRew.classList.add("modal-open");
    inputRew.value = currentText.textContent;

    function updateText() {
      currentText.textContent = inputRew.value;
      modalRew.classList.remove("modal-open");
      btnRew.removeEventListener("click", updateText);
    }

    btnRew.addEventListener("click", updateText);
  });
});

// MARK COMPLETED TASK
allMarks.forEach(function (marks) {
  marks.addEventListener("click", function () {
    console.log("clicked mark");
  });
});
