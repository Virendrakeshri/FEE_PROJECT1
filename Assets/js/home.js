let taskArray = [];
let edit_id = null;

let objStr = localStorage.getItem('tasks');

if (objStr != null) {
    taskArray = JSON.parse(objStr);
}
// Calculate total, completed, and pending tasks from taskArray
const totalTasksCount = taskArray.length;
const completedTasksCount = taskArray.filter(task => task.status === 'Complete').length;
const pendingTasksCount = totalTasksCount - completedTasksCount;

// Update the task counts in the HTML
document.getElementById('totalTasks').textContent = totalTasksCount;
document.getElementById('completedTasks').textContent = completedTasksCount;
document.getElementById('pendingTasks').textContent = pendingTasksCount;