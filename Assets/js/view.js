const addTaskBtn = document.getElementById('addTask');
const taskNameInput = document.getElementById('taskName');
const assignedToInput = document.getElementById('assignedTo');
const categoriesSelect = document.getElementById('categories');
const taskDateInput = document.getElementById('taskDate');
const recordsDisplay = document.getElementById('records');


let taskArray = [];
let edit_id = null;

let objStr = localStorage.getItem('tasks');

if (objStr != null) {
    taskArray = JSON.parse(objStr);
}

DisplayTasks();

// ============================== Save Function =======================

function SaveTasks(taskArray) {
    let str = JSON.stringify(taskArray);
    localStorage.setItem('tasks', str);
    DisplayTasks();
}


// ================================ Display Function ==============================

function DisplayTasks(tasksToShow) {
 let statement = '';
    const tasksToDisplay = tasksToShow || taskArray;

    const currentDate = new Date();

    tasksToDisplay.forEach((task, i) => {
        const taskDate = new Date(task.taskDate);
        const isOverdue = task.status === 'Pending' && taskDate < currentDate;

        const rowColor = isOverdue ? 'style="color: red;"' : '';
        const taskStatus = task.completed ? 'Complete' : (isOverdue ? 'Overdue' : task.status);

        statement += `<tr ${rowColor}>
        <th scope="row">${i + 1}</th>
        <td contenteditable="true" onBlur="updateTaskData(this, 'taskName', ${i})">${task.taskName}</td>
        <td contenteditable="true" onBlur="updateTaskData(this, 'assignedTo', ${i})">${task.assignedTo}</td>
        <td contenteditable="true" onBlur="updateTaskData(this, 'categories', ${i})">${task.categories}</td>
        <td>${task.taskDate}</td>
        <td>${taskStatus}</td>
        <td>
            <i class="fa fa-check btn text-white btn mx-2 bg-success" id="completeTaskbtn"
                onclick="CompleteTask(${i})"></i>
            <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteTask(${i})'></i>
        </td>
        </tr>`;
    });

    recordsDisplay.innerHTML = statement;

    if (tasksToDisplay.length === 0) {
        recordsDisplay.innerHTML = '<tr><td colspan="7">No records found.</td></tr>';
    }

    // Update the task count
    document.getElementById('totalTasks').textContent = tasksToDisplay.length;
}



//======================= Update Function ================================

function updateTaskData(element, field, id) {
    taskArray[id][field] = element.innerText;
    SaveTasks(taskArray);
}

// ===================== Delete Function ===============================

function DeleteTask(id) {
    taskArray.splice(id, 1);
    SaveTasks(taskArray);
}


// ===================== Complete Function ==============================


function CompleteTask(id) {
    if (taskArray[id].status === 'Pending' || taskArray[id].status === 'Overdue') {
        taskArray[id].status = 'Complete';
    }

    SaveTasks(taskArray);

    DisplayTasks();
}


// // ============================= Filter Option =========================================

const filterOption = document.getElementById('filterOption');
filterOption.addEventListener('change', function () {
    const selectedOption = filterOption.value;
    let filteredTasks = [];

    if (selectedOption === 'all') {
        filteredTasks = taskArray;
    } else if (selectedOption === 'complete' || selectedOption === 'pending') {
        filteredTasks = taskArray.filter(task => task.status.toLowerCase() === selectedOption.toLowerCase());
    } else {
        filteredTasks = taskArray.filter(task => task.categories.toLowerCase() === selectedOption.toLowerCase());
    }
    console.log(filteredTasks);
    DisplayTasks(filteredTasks);
});


