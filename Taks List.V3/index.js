const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const taskContainer = document.querySelector('.taskContainer')

let taskList = []

function initialLoad() {
    if (!localStorage.getItem('tasks')) { return }
    taskList = JSON.parse(localStorage.getItem('tasks')).taskList
    updateUI()
}

initialLoad()

function addTask() {
    const task = textarea.value
    if (!task) { return }

    console.log('Added task: ', task)
    taskList.push(task)
    textarea.value = '' // clear textarea
    updateUI()
}

function editTask(index) {
    textarea.value = taskList[index]
    taskList = taskList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()

}

function deleteTask(index) {
    taskList = taskList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false }
        return true
    })
    updateUI()

}

function updateUI(list = taskList) {
    let newInnerHTML = ''

    list.forEach((taskElement, taskIndex) => {
        newInnerHTML += `
        <div class="tasks">
        <p>${taskElement}</p>
        <div class="btnContainer">
            <button class="iconBtn" onclick="editTask(${taskIndex})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="iconBtn" onclick="deleteTask(${taskIndex})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>    
        `
    })

    taskContainer.innerHTML = newInnerHTML

    // Save to local storage
    localStorage.setItem('tasks', JSON.stringify({ taskList }))
}

function filterTasks() {
    const text = document.getElementById("search").value.toLowerCase()

    if (text === '') {
        updateUI(taskList)
        return
    }

    const filtered = taskList.filter(task =>
        task.toLowerCase().includes(text)
    )

    updateUI(filtered)
}


addBtn.addEventListener('click', addTask)