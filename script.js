const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const filterButtons = document.querySelectorAll(".filter-btn");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load selected filter from localStorage
let currentFilter = localStorage.getItem("filter") || "all";

function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Filter tasks based on the selected filter
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });
    }

    filteredTasks.forEach(function(task) {
        const li = document.createElement("li");

        li.textContent = task.text;

        if (task.completed === true) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function() {
            task.completed = !task.completed;

            // Save updated tasks to localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();
        });

        taskList.appendChild(li);
    });

    taskCount.textContent = "Tasks: " + filteredTasks.length;
}

// Add a new task
addTaskBtn.addEventListener("click", function() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);

    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
});

// Handle filter button clicks
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        // Save selected filter to localStorage
        localStorage.setItem("filter", currentFilter);

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});

// Restore the selected filter after page refresh
filterButtons.forEach(function(button) {
    if (button.dataset.filter === currentFilter) {
        button.classList.add("active");
    }
});

// Display saved tasks when the page loads
displayTasks();