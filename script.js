"use strict";

const task1 = {
  text: "test1",
  id: 1,
};

const task2 = {
  text: "test2",
  id: 2,
};

const allTasks = [task1, task2];
const doneTasks = [];

// GLOBAL VARIABLES
const modalNew = document.querySelector(".modalNew");
const modalRew = document.querySelector(".modalRew");
const btnCreateTask = document.querySelector("#btnCreateTask");
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
const doneNum = document.querySelector("#doneNum");
const btnCurrent = document.querySelector("#btnCurrent");
const btnDone = document.querySelector("#btnDone");

// GLOBAL FUNCTIONS
const closeModal = () =>
  modalNew.classList.remove("modal-open") ||
  modalRew.classList.remove("modal-open");

// UPDATE TOTAL AND DONE TASKS QUANTITY FUNCTION
const totalUpd = function () {
  totalNum.textContent = `${allTasks.length}`;
  doneNum.textContent = `${doneTasks.length}`;
};

// SHOW TASK FUNCTION
const showTasks = function (allT) {
  listItems.innerHTML = "";
  allT.forEach(function (task) {
    const taskHTML = ` 
    <div class="task" id="task-div-${task.id}"> 
      <img class="complete" src="svg/complete.svg" id="task-img"> 
      <p class="task-text" data-id="${task.id}">${task.text}</p> 
    </div>`;
    listItems.insertAdjacentHTML("afterbegin", taskHTML);
  });
};

// // OPEN MODAL
const openModal = function () {
  btnCreateTask.addEventListener("click", function () {
    modalNew.classList.add("modal-open");
  });
};

openModal();
totalUpd();
showTasks(allTasks);

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
    <div class="task" id="task-div-${task.id}"> 
      <img class="complete" src="svg/complete.svg" id="task-img"> 
      <p class="task-text" data-id="${task.id}">${task.text}</p> 
    </div>`;
    listItems.insertAdjacentHTML("afterbegin", taskHTML);

    inputAdd.value = "";

    modalNew.classList.remove("modal-open");
    totalUpd();
  } else {
    alert(`Пустое поле!`);
  }
});

// CHANGE STATE BUTTONS FUNCTION
function toggleClickedBtn() {
  if (btnCurrent.classList.contains("btn-state-clicked")) {
  }
  btnCurrent.classList.toggle("btn-state-clicked");
  btnDone.classList.toggle("btn-state-clicked");
}

btnCurrent.addEventListener("click", function () {
  if (this.classList.contains("btn-state-clicked")) {
  } else {
    toggleClickedBtn();
    btnCreateTask.style.display = "block";
    showTasks(allTasks);
  }
});

btnDone.addEventListener("click", function () {
  if (this.classList.contains("btn-state-clicked")) {
  } else {
    toggleClickedBtn();
    btnCreateTask.style.display = "none";
    showTasks(doneTasks);
  }
});

// // CLOSE MODALNEW
modalNew.addEventListener("click", function (e) {
  if (e.target === modalNew) {
    closeModal();
  }
});

// // CLOSE MODALREW
modalRew.addEventListener("click", function (e) {
  if (e.target === modalRew) {
    closeModal();
  }
});

// ACTIONS WITH KEYBOARD
document.addEventListener("keydown", function (e) {
  if (
    e.key == "Escape" &&
    (modalNew.classList.contains("modal-open") ||
      modalRew.classList.contains("modal-open"))
  ) {
    closeModal();
  }
});

// CREATE CHANGE TEXT FUNCTION
let currentText = null;
listItems.addEventListener("click", function (event) {
  if (event.target.classList.contains("task-text")) {
    modalRew.classList.add("modal-open");
    inputRew.value = event.target.textContent;
    currentText = event.target;
  }
});

btnRew.addEventListener("click", function () {
  if (currentText !== null) {
    currentText.textContent = inputRew.value;
    const taskId = currentText.getAttribute("data-id");
    const task = allTasks.find((t) => t.id === parseInt(taskId));
    if (task) {
      task.text = inputRew.value;
    }
    modalRew.classList.remove("modal-open");
  }
});

// MARK A TASK IMG AS COMPLETE
listItems.addEventListener("click", function (e) {
  if (e.target.classList.contains("complete")) {
    const img = e.target;
    const p = img.nextElementSibling;

    img.classList.add("complete-done");
    p.classList.add("text-done");
  }
});

// DELETING TASK FROM MAIN LIST AND CONVERT THEM TO DONETASKS ARRAY
listItems.addEventListener("click", function (e) {
  document.querySelectorAll(".complete-done").forEach((mark) => {
    mark.addEventListener("click", function () {
      const clickTaskText = e.target.nextElementSibling.textContent;
      const findingTask = allTasks.findIndex(
        (task) => task.text === clickTaskText
      );
      doneTasks.push(allTasks[findingTask]);
      allTasks.splice(findingTask, 1);

      totalUpd();
      showTasks(allTasks);
    });
  });
});

// const listCoord = listItems.getBoundingClientRect();
// const taskCoord = document.querySelector(e).getBoundingClientRect();
// const newCoord = listCoord.top - taskCoord.top;
// document.querySelector(".task").style.top = `${Math.abs(newCoord)}px`;
// setTimeout(removeTask, 500);
