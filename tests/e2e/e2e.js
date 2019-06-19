import { Selector, ClientFunction } from 'testcafe'

const hostname = 'localhost'
const port = process.env.PORT || '8080'

// Tasks
const task1 = 'The first task'
const task2 = 'The second task'
const task2mod = 'The second completed task'
const task3 = 'The third task'
const task3mod = 'The modified third task'

// To Do List selectors
const todoSection = Selector('.section').withText('To Do List')
const todoSortButton = Selector('button').child('svg.fa-sort')
const todoSortLabel = todoSortButton.parent().find('label').withText('First')
const todoSortSelect = todoSortButton.parent().find('select')
const todoSortOption = todoSortSelect.child('option')
const newTaskInput = Selector('input').withAttribute('placeholder', 'enter new task')
const todoList = todoSection.find('.task-list')
const todoTasks = todoList.find('.task')

// Completed List selectors
const doneSection = Selector('.section').withText('Completed Tasks')
const doneSortButton = doneSection.find('button').child('svg.fa-bars')
const doneSortLabel = doneSortButton.parent().find('label').withText('First')
const doneSortSelect = doneSortButton.parent().find('select')
const doneSortOption = doneSortSelect.child('option')
const doneList = doneSection.find('.task-list')
const doneTasks = doneList.find('.task')
const doneMenuButton = doneSection.find('button').child('svg.fa-bars')
const clearAllButton = Selector('button').withText('Clear All')

const tasksPresent = ClientFunction((taskList, expectedTasks, checked = false) => {
  const tasks = taskList().childNodes
  return tasks.length === expectedTasks.length &&
    [].every.call(tasks, (task, i) => {
      const input = task.getElementsByTagName('input')[0]
      return task.textContent.includes(expectedTasks[i]) &&
        input.type === 'checkbox' &&
        input.checked === checked
    })
})

function checkbox (taskName) {
  return todoTasks.withText(taskName).find('input').withAttribute('type', 'checkbox')
}

function saveButton () {
  return Selector('input.edit-task').parent('.task').find('button')
    .filter(node => node.getElementsByTagName('svg')[0].classList.contains('fa-save'))
}

function menuButton (taskName) {
  return Selector('.task').withText(taskName).find('button')
    .filter(node => node.getElementsByTagName('svg')[0].classList.contains('fa-ellipsis-h'))
}

function deleteButton (taskName) {
  return Selector('.task').withText(taskName).find('button')
    .filter(node => node.getElementsByTagName('svg')[0].classList.contains('fa-trash-alt'))
}

const deleteHandler = ClientFunction((type, text) => {
  switch (type) { /* eslint-disable no-throw-literal */
    case 'confirm':
      switch (text) { /* eslint-disable no-undef */
        case (typeof taskName !== 'undefined') &&
        `Are you sure you want to delete task ${taskName}? the task is not yet complete!`:
          return deleteTask
        case (typeof numCompletedTasks !== 'undefined') &&
        `Are you sure that you want to delete all ${numCompletedTasks} completed tasks?`:
          return deleteTask
        default:
          throw 'Unexpected confirm dialog!'
      }
    case 'prompt':
      throw 'A prompt was invoked!'
    case 'alert':
      throw 'An alert was invoked!'
  }
})

fixture('To Do List')
  .page(`http://${hostname}:${port}`)
  .beforeEach(async t => {
    await t
      
      // Expect an empty To Do List
      .expect(todoSection.find('h1').withText('To Do List').exists).ok()
      .expect(todoSortButton.exists).ok()
      .expect(todoTasks.count).eql(0)
      .expect(doneSection.exists).notOk()
      .expect(doneTasks.count).eql(0)

      // Add tasks
      .typeText(newTaskInput, task1).pressKey('enter')
      .typeText(newTaskInput, task2).pressKey('enter')
      .typeText(newTaskInput, task3).pressKey('enter')
      
      // Expect all 3 tasks in the To Do List
      .expect(tasksPresent(todoList, [task1, task2, task3])).ok()
  })

test('Complete tasks, expect most recently-deleted first', async t => {
  await t
    .click(checkbox(task1))
    .click(checkbox(task2))
    .click(checkbox(task3))
    .expect(tasksPresent(todoList, [])).ok()
    .expect(doneSection.exists).ok()
    .expect(tasksPresent(doneList, [task3, task2, task1], true)).ok()
})

test('Switch To Do list order from Oldest-First to Newest-First', async t => {
  await t
    .expect(todoSortLabel.visible).notOk()
    .expect(todoSortSelect.visible).notOk()
    .click(todoSortButton)
    .expect(todoSortLabel.visible).ok()
    .expect(todoSortSelect.visible).ok()
    .expect(todoSortSelect.value).eql('Oldest')
    .click(todoSortSelect)
    .click(todoSortOption.withText('Newest'))
    .expect(todoSortSelect.value).eql('Newest')
    .expect(tasksPresent(todoList, [task3, task2, task1])).ok()
})

test('Switch completed list order from Recent-First to Oldest-First and back', async t => {
  await t
    .click(checkbox(task1))
    .click(checkbox(task2))
    .click(checkbox(task3))
    .expect(tasksPresent(doneList, [task3, task2, task1], true)).ok()
    .expect(doneSortLabel.visible).notOk()
    .expect(doneSortSelect.visible).notOk()
    .click(doneSortButton)
    .expect(doneSortLabel.visible).ok()
    .expect(doneSortSelect.visible).ok()
    .expect(doneSortSelect.value).eql('Recent')
    .click(doneSortSelect)
    .click(doneSortOption.withText('Oldest'))
    .expect(doneSortSelect.value).eql('Oldest')
    .expect(tasksPresent(doneList, [task1, task2, task3], true)).ok()
    .expect(doneSortLabel.visible).ok()
    .expect(doneSortSelect.visible).ok()
    .expect(doneSortSelect.value).eql('Oldest')
    .click(doneSortSelect)
    .click(doneSortOption.withText('Recent'))
    .expect(tasksPresent(doneList, [task3, task2, task1], true)).ok()
})

test('Modify task in the To Do list and then mark it as complete', async t => {
  await t
    
    .click(todoTasks.find('span').withText(task3))
    .expect(Selector('input.edit-task').value).eql(task3)
    .typeText(Selector('input.edit-task'), ' modified', { caretPos: 3 })
    .pressKey('enter')
    .expect(tasksPresent(todoList, [task1, task2, task3mod])).ok()
    
    .expect(doneSection.exists).notOk()
    .click(checkbox(task3mod))
    .expect(tasksPresent(todoList, [task1, task2])).ok()
    .expect(tasksPresent(doneList, [task3mod], true)).ok()
})

test('Click incomplete task delete button, expect confirmation popup, do not confirm', async t => {
  await t
    .setNativeDialogHandler(deleteHandler, { dependencies: { taskName: task2, deleteTask: false } })
    .click(menuButton(task2))
    .click(deleteButton(task2))
    .expect(tasksPresent(todoList, [task1, task2, task3])).ok()
    .expect(doneSection.exists).notOk()
})

test('Click incomplete task delete button, expect confirmation popup, confirm delete', async t => {
  await t
    .setNativeDialogHandler(deleteHandler, { dependencies: { taskName: task1, deleteTask: true } })
    .click(menuButton(task1))
    .click(deleteButton(task1))
    .expect(tasksPresent(todoList, [task2, task3])).ok()
    .expect(doneSection.exists).notOk()
})

test('Click completed task delete button, expect no confirmation popup', async t => {
  await t
    .click(checkbox(task3))
    .expect(tasksPresent(todoList, [task1, task2])).ok()
    .expect(tasksPresent(doneList, [task3], true)).ok()
    .click(menuButton(task3))
    .click(deleteButton(task3))
    .expect(tasksPresent(todoList, [task1, task2])).ok()
    .expect(doneSection.exists).notOk()
})

test('Modify task in the completed list', async t => {
  await t
    .click(checkbox(task2))
    .click(doneTasks.find('span').withText(task2))
    .expect(Selector('input.edit-task').value).eql(task2)
    .typeText(Selector('input.edit-task'), 'completed ', { caretPos: 11 })
    .click(saveButton())
    .expect(tasksPresent(todoList, [task1, task3])).ok()
    .expect(tasksPresent(doneList, [task2mod], true)).ok()
})

test('Click the Clear button to clear all completed tasks', async t => {
  await t
    .click(checkbox(task3))
    .click(checkbox(task2))
    .click(checkbox(task1))
    .expect(tasksPresent(todoList, [])).ok()
    .expect(tasksPresent(doneList, [task1, task2, task3], true)).ok()
    .setNativeDialogHandler(deleteHandler, { dependencies: { numCompletedTasks: 3, deleteTask: true } })
    .click(doneMenuButton)
    .click(clearAllButton)
    .expect(doneSection.exists).notOk()
})

test('Complete task, click the Clear button, expect no popup', async t => {
  await t
    .click(checkbox(task1))
    .expect(tasksPresent(todoList, [task2, task3])).ok()
    .expect(tasksPresent(doneList, [task1], true)).ok()
    .setNativeDialogHandler(deleteHandler, { dependencies: { numCompletedTasks: 9, deleteTask: false } })
    .click(doneMenuButton)
    .click(clearAllButton)
    .expect(tasksPresent(todoList, [task2, task3])).ok()
    .expect(doneSection.exists).notOk()
})
