var newTaskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasks = document.getElementById("incomplete-tasks");
var completedTasks = document.getElementById("completed-tasks");

var completedTasksHeader = document.getElementById('completes');
var incompleteTasksHeader = document.getElementById('todos');

newTaskInput.addEventListener("focus", function() {
 resetInput(this);
});

addButton.addEventListener("click", function() {
  var newTaskText = newTaskInput.value;
  if(newTaskText.length > 0) {
    addTask(newTaskText);
    newTaskInput.value = "";
  }
  else {
    newTaskInput.style.color = 'tomato';
    newTaskInput.style.fontSize = '14px';
    newTaskInput.value = "New task's name length must be greater than 0!";
  }
});

var addTask = function (taskName) {
  console.log(taskName);
  var newTask = document.createElement("li");
  
  var taskCheckButton = document.createElement("input"); 
  var taskLabel = document.createElement("label");
  var taskInput = document.createElement("input"); 
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
  taskCheckButton.type = "checkbox";
  
  taskLabel.innerText = taskName;
  taskInput.type = "text";
  
  editButton.className = "edit";
  deleteButton.className = "delete";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  
  newTask.appendChild(taskCheckButton);
  newTask.appendChild(taskLabel);
  newTask.appendChild(taskInput);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);
  
  incompleteTasks.appendChild(newTask);
  bindButtonsToTasks(newTask, completeTask);
  
}

var editTask = function() {
 console.log("editin"); 

  var currentTask = this.parentNode;
  var currentTaskInput = currentTask.querySelector("input[type=text]");
  var currentText = currentTaskInput.value;
  var currentTaskLabel = currentTask.querySelector("label");
  var currentTaskState = currentTask.classList.contains("editMode");
  
  if(currentTaskState) {
    if(currentTaskInput.value.length > 0) {
      currentTaskLabel.innerText = currentTaskInput.value;
      this.innerText = "Edit";
    }
    else {
      currentTaskLabel.innerText = "An unnamed task.";
    }
  }
  else {
      currentTaskInput.value = currentTaskLabel.innerText;
      this.innerText = "Save";
  }
   currentTask.classList.toggle("editMode");
}

var deleteTask = function() {
  console.log("deletin");
  var currentTask = this.parentNode;
  var currentTaskGroup = currentTask.parentNode;
  currentTaskGroup.removeChild(currentTask);
  checkHeaders();
}

var completeTask = function() {
  completedTasks.appendChild(this.parentNode);
  bindButtonsToTasks(this.parentNode, incompleteTask);
}

var incompleteTask = function() {
  incompleteTasks.appendChild(this.parentNode);
  bindButtonsToTasks(this.parentNode, completeTask);
}

var resetInput = function(element) {
    if(element.value.length > 0) {
    element.value = "";
    element.style.color = null;
    element.style.fontSize = null;
  }
}

var traverseThrough = function(list, listType) {
  checkHeaders();
  for(var i = 0; i < list.children.length; i++) {
    if(listType == "finished") {
      bindButtonsToTasks(list.children[i], incompleteTask);
    }
    else if(listType == "unfinished") {
      bindButtonsToTasks(list.children[i], completeTask);
    }
  }
}

var bindButtonsToTasks = function(listTaskItem, actionToBeBound) {
  
  var checkButton = listTaskItem.querySelector('input[type=checkbox]');
  var editButton = listTaskItem.querySelector('button.edit');
  var deleteButton = listTaskItem.querySelector('button.delete');
  
  checkButton.onchange = actionToBeBound;
   editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkHeaders();
}

traverseThrough(incompleteTasks, "unfinished");
traverseThrough(completedTasks, "finished");


function checkHeaders() {
  if(incompleteTasks.children.length == 0) {
      incompleteTasksHeader.style.display = "none";
    }
  else incompleteTasksHeader.style.display = "";
    if(completedTasks.children.length == 0) {
      completedTasksHeader.style.display = "none";  
    }
  else completedTasksHeader.style.display = ""; 
}


