import {Selector, ClientFunction} from 'testcafe'; // first import testcafe selectors

const hostname = 'localhost'
const port = process.env.PORT || '8080'

fixture`To Do List`
  .page`http://${hostname}:${port}`;

const task1 = 'This is my first task'
const task2 = 'This is my second task'
const task2mod = 'This is my second completed task'
const task3 = 'This is my third task'
const task3mod = 'This is my modified third task'
const task4 = 'This is my fourth task'
const task5 = 'This is my fifth task'

const newTaskInput = Selector('input').withAttribute('placeholder', 'enter new task')

const todoSection = Selector('.section').withText('To Do List')
const settingsButton = Selector('button').child('svg.fa-cog')
const orderLabel = Selector('.dropdown-menu label').withText('First').withAttribute('for', 'toDoOrderGroupSelect')
const orderGroupSelect = Selector('#toDoOrderGroupSelect')
const orderOption = orderGroupSelect.child('option')
const todoList = todoSection.find('.task-list')
const todoTasks = todoList.find('.task')

const doneSection = Selector('.section').withText('Completed Tasks')
const doneList = doneSection.find('.task-list')
const doneTasks = doneList.find('.task')
const clearAllButton = Selector('button').withText('Clear All')

const tasksPresent = ClientFunction((taskList, expectedTasks, checked = false) => {
  const tasks = taskList().childNodes
  return tasks.length === expectedTasks.length &&
    [].every.call(tasks, (task, i) => {
      const input = task.getElementsByTagName("input")[0]
      return task.textContent.includes(expectedTasks[i]) &&
        input.type === 'checkbox' &&
        input.checked === checked
    })
})

function saveButton() {
  return Selector('input.edit-task').parent('.task').find('button')
    .filter(node => node.getElementsByTagName('svg')[0].classList.contains('fa-save'))
}

function menuButton(taskName) {
  return Selector('.task').withText(taskName).find('button')
    .filter(node => node.getElementsByTagName('svg')[0].classList.contains('fa-ellipsis-h'))
}

function deleteButton(taskName) {
  return Selector('.task').withText(taskName).find('button')
    .filter(node => node.getElementsByTagName('svg')[0].classList.contains('fa-trash-alt'))
}

const deleteHandler = ClientFunction((type, text) => {
  switch (type) {
    case 'confirm':
      switch (text) { /* eslint-disable no-undef */
        case (typeof taskName !== 'undefined') &&
        `Are you sure you want to delete task ${taskName}? the task is not yet complete!`:
          return deleteTask
        case `Are you sure that you want to delete all ${numCompletedTasks} completed tasks?`:
          return deleteTask
        default:
          throw 'Unexpected confirm dialog!';
      }
    case 'prompt':
      throw 'A prompt was invoked!';
    case 'alert':
      throw 'An alert was invoked!';
  }
})

//then create a test and place your code there
test('Create, Complete and Delete Tasks to Test Functionality', async t => {
  await t

    // Expect an empty To Do List
    .expect(todoSection.find('h1').withText('To Do List').exists).ok()
    .expect(settingsButton.exists).ok()
    .expect(todoTasks.count).eql(0)
    .expect(doneTasks.count).eql(0)

    // Add task 1
    .typeText(newTaskInput, task1).pressKey('enter')
    .expect(tasksPresent(todoList, [task1])).ok()

    // Add task 2
    .typeText(newTaskInput, task2).pressKey('enter')
    .expect(tasksPresent(todoList, [task1, task2])).ok()

    // Add task 3
    .typeText(newTaskInput, task3).pressKey('enter')
    .expect(tasksPresent(todoList, [task1, task2, task3])).ok()

    // Switch list order from Oldest First to Newest First
    .expect(orderLabel.visible).notOk()
    .expect(orderGroupSelect.visible).notOk()
    .click(settingsButton)
    .expect(orderLabel.visible).ok()
    .expect(orderGroupSelect.visible).ok()
    .expect(orderGroupSelect.value).eql('Oldest')
    .click(orderGroupSelect)
    .click(orderOption.withText('Newest'))
    .expect(orderGroupSelect.value).eql('Newest')
    .expect(tasksPresent(todoList, [task3, task2, task1])).ok()

    // Add task 4
    .typeText(newTaskInput, task4).pressKey('enter')
    .expect(tasksPresent(todoList, [task4, task3, task2, task1])).ok()

    // Mark task 2 as complete
    .expect(doneSection.exists).notOk()
    .click(todoTasks.withText(task2).find('input').withAttribute('type', 'checkbox'))
    .expect(tasksPresent(todoList, [task4, task3, task1])).ok()
    .expect(doneSection.exists).ok()
    .expect(tasksPresent(doneList, [task2], true)).ok()

    // Modify task 3 in the To Do list
    .click(todoTasks.find('span').withText(task3))
    .expect(Selector('input.edit-task').value).eql(task3)
    .typeText(Selector('input.edit-task'), ' modified', {caretPos: 10})
    .pressKey('enter')
    .expect(tasksPresent(todoList, [task4, task3mod, task1])).ok()
    .expect(tasksPresent(doneList, [task2], true)).ok()

    // Mark task 3 as complete
    .click(todoTasks.withText(task3mod).find('input').withAttribute('type', 'checkbox'))
    .expect(tasksPresent(todoList, [task4, task1])).ok()
    .expect(tasksPresent(doneList, [task3mod, task2], true)).ok()

    // Click task 4 delete button, expect confirmation popup, do not confirm
    .setNativeDialogHandler(deleteHandler, {dependencies: {taskName: task4, deleteTask: false}})
    .click(menuButton(task4))
    .click(deleteButton(task4))
    .expect(tasksPresent(todoList, [task4, task1])).ok()
    .expect(tasksPresent(doneList, [task3mod, task2], true)).ok()

    // Click task 3 delete button, expect no confirmation popup
    .click(menuButton(task3mod))
    .click(deleteButton(task3mod))
    .expect(tasksPresent(todoList, [task4, task1])).ok()
    .expect(tasksPresent(doneList, [task2], true)).ok()

    // Click task 1 delete button, expect confirmation popup, confirm delete
    .setNativeDialogHandler(deleteHandler, {dependencies: {taskName: task1, deleteTask: true}})
    .click(menuButton(task1))
    .click(deleteButton(task1))
    .expect(tasksPresent(todoList, [task4])).ok()
    .expect(tasksPresent(doneList, [task2], true)).ok()

    // Modify task 2 in the completed list
    .click(doneTasks.find('span').withText(task2))
    .expect(Selector('input.edit-task').value).eql(task2)
    .typeText(Selector('input.edit-task'), 'completed ', {caretPos: 18})
    .click(saveButton())
    .expect(tasksPresent(todoList, [task4])).ok()
    .expect(tasksPresent(doneList, [task2mod], true)).ok()

    // Add task 5 and complete it
    .typeText(newTaskInput, task5).pressKey('enter')
    .click(todoTasks.withText(task5).find('input').withAttribute('type', 'checkbox'))
    .expect(tasksPresent(todoList, [task4])).ok()
    .expect(tasksPresent(doneList, [task5, task2mod], true)).ok()
    
    // Click the Clear button to clear all completed tasks
    .setNativeDialogHandler(deleteHandler, {dependencies: {numCompletedTasks: 2, deleteTask: true}})
    .click('#completedSettingsButton')
    .click(clearAllButton)
    .expect(tasksPresent(todoList, [task4])).ok()
    .expect(doneSection.exists).notOk()

    // Complete task 4, click the Clear button, expect no popup
    .click(todoTasks.withText(task4).find('input').withAttribute('type', 'checkbox'))
    .expect(tasksPresent(todoList, [])).ok()
    .expect(tasksPresent(doneList, [task4], true)).ok()
    .setNativeDialogHandler(deleteHandler, {dependencies: {numCompletedTasks: 9, deleteTask: false}})
    .click('#completedSettingsButton')
    .click(clearAllButton)
    .expect(tasksPresent(todoList, [])).ok()
    .expect(doneSection.exists).notOk()

});
