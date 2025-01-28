// Select necessary elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when the page loads
window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Add event listener for pressing "Enter" to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;  // Ignore empty input

    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = '';  // Clear input field
}

// Function to add task to the DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.classList.toggle('completed', completed);
    
    li.innerHTML = `
        <span>${text}</span>
        <div class="task-actions">
            <button class="complete-btn">${completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Event listener for marking task as complete
    li.querySelector('.complete-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleCompleteInStorage(text);
    });

    // Event listener for deleting task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeTaskFromStorage(text);
    });

    taskList.appendChild(li);
}

// Function to save task to localStorage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to toggle task completion in localStorage
function toggleCompleteInStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = !task.completed;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove task from localStorage
function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
