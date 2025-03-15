//show list after refreshing
document.addEventListener("DOMContentLoaded", loadTasks);


function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value.trim();
    
    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = createTaskElement(task);

    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks();
}

function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", function() {
        li.classList.toggle("completed");
        saveTasks();
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteButton);
    return li;
}
//save task to localstorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load task from localstorage
function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    savedTasks.forEach(task => {
        let li = createTaskElement(task.text);
        if (task.completed) li.classList.add("completed"); 
        taskList.appendChild(li);
    });
}
