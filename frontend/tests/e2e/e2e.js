import { Selector, ClientFunction } from 'testcafe'

// App Bar selectors
const appBar = Selector('header').withText('ListVue')
const loginDialog = Selector('div.v-dialog').withText('Log In')
const emailInput = loginDialog.find('label').withText('Email*').sibling('input')
const passwordInput = loginDialog.find('label').withText('Password*').sibling('input')
const profileButton = appBar.find('button i.mdi-account')

// To Do List selectors
const todoSection = Selector('.section').withText('To Do')
const listMenuButton = Selector('.title-section').withText('To Do').find('button i.mdi-dots-vertical')
const newTaskInput = todoSection.find('label').withText('enter new task').sibling('input')
const todoList = todoSection.find('.task-list')
const todoTasks = todoList.find('.task')

// Completed List selectors
const doneSection = Selector('.section').withText('Completed')
const doneList = doneSection.find('.task-list')
const doneTasks = doneList.find('.task')
const clearAllButton = doneSection.find('button').withText('CLEAR ALL')

// Task selectors
const tasksPresent = ClientFunction((taskList, expectedTasks, checked = false) => {
  const tasks = taskList().getElementsByClassName('task')
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

const editTaskWrapper = Selector('div.edit-task')
const editTaskInput = editTaskWrapper.find('input')
const saveButton = editTaskWrapper.find('button.mdi-content-save')

// Menu selectors
function menuButton (taskName) {
  return Selector('.task').withText(taskName).find('button i.mdi-dots-vertical')
}

const menuContent = Selector('div.v-menu__content')
const editButton = menuContent.find('button i.mdi-pencil')
const deleteButton = menuContent.find('button i.mdi-delete')
const clearTasksButton = menuContent.find('button').withText('CLEAR TASKS')
const deleteHandler = ClientFunction((type, text) => {
  switch (type) { /* eslint-disable no-throw-literal */
    case 'confirm':
      switch (true) { /* eslint-disable no-undef */
        case (typeof taskName !== 'undefined') && text ===
        `Are you sure that you want to delete "${taskName}"? The task is not yet complete!`:
          return deleteTask
        case (typeof numCompletedTasks !== 'undefined') && text ===
        `Are you sure that you want to delete all ${numCompletedTasks} completed tasks?`:
          return deleteTask
        case (typeof numTasks !== 'undefined') &&
        /Are you sure that you want to delete all [23] tasks from this list\?/.test(text):
          return deleteAll
        default:
          throw `Unexpected confirm dialog: \n"${text}"`
      }
    case 'prompt':
      throw 'A prompt was invoked!'
    case 'alert':
      throw 'An alert was invoked!'
  }
})

// Tasks
const task1 = 'The first task'
const task2 = 'The second task'
const task2mod = 'The second completed task'
const task3 = 'The third task'
const task3mod = 'The modified third task'

const hostname = process.env.HOST || 'localhost'
const port = process.env.PORT || '8080'
const path = process.env.BASE_URL || ''
const url = `http://${hostname}:${port}${path}`

console.log(`Testing agaginst ${url}`) // eslint-disable-line no-console

fixture('To Do List')
  .page(url)
  .beforeEach(async t => {
    await t
      
      // Log in
      .expect(appBar.visible).ok()
      .click(appBar.find('button').withText('LOG IN'))
      .expect(loginDialog.visible).ok()
      .typeText(emailInput, 'test@example.com')
      .typeText(passwordInput, 'testpassword')
      .pressKey('enter')
      .expect(profileButton.visible).ok()
      
      // Expect an empty To Do List
      .expect(todoSection.find('h1').withText('To Do').exists).ok()
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
  .afterEach(async t => {
    await t
      .click(listMenuButton)
      .setNativeDialogHandler(deleteHandler, { dependencies: { numTasks: 3, deleteAll: true } })
      .click(clearTasksButton)
      .expect(todoTasks.count).eql(0)
      .expect(doneSection.exists).notOk()
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

test('Modify task in the To Do list and then mark it as complete', async t => {
  await t
    
    .click(menuButton(task3))
    .click(editButton)
    .expect(editTaskInput.value).eql(task3)
    .typeText(editTaskInput, ' modified', { caretPos: 3 })
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
    .click(deleteButton)
    .expect(tasksPresent(todoList, [task1, task2, task3])).ok()
    .expect(doneSection.exists).notOk()
})

test('Click incomplete task delete button, expect confirmation popup, confirm delete', async t => {
  await t
    .setNativeDialogHandler(deleteHandler, { dependencies: { taskName: task1, deleteTask: true } })
    .click(menuButton(task1))
    .click(deleteButton)
    .expect(tasksPresent(todoList, [task2, task3])).ok()
    .expect(doneSection.exists).notOk()
})

test('Click completed task delete button, expect no confirmation popup', async t => {
  await t
    .click(checkbox(task3))
    .expect(tasksPresent(todoList, [task1, task2])).ok()
    .expect(tasksPresent(doneList, [task3], true)).ok()
    .click(menuButton(task3))
    .click(deleteButton)
    .expect(tasksPresent(todoList, [task1, task2])).ok()
    .expect(doneSection.exists).notOk()
})

test('Modify task in the completed list', async t => {
  await t
    .click(checkbox(task2))
    .click(menuButton(task2))
    .click(editButton)
    .expect(editTaskInput.value).eql(task2)
    .typeText(editTaskInput, 'completed ', { caretPos: 11 })
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
    .click(clearAllButton)
    .expect(doneSection.exists).notOk()
})

test('Complete task, click the Clear button, expect no popup', async t => {
  await t
    .click(checkbox(task1))
    .expect(tasksPresent(todoList, [task2, task3])).ok()
    .expect(tasksPresent(doneList, [task1], true)).ok()
    .setNativeDialogHandler(deleteHandler, { dependencies: { numCompletedTasks: 9, deleteTask: false } })
    .click(clearAllButton)
    .expect(tasksPresent(todoList, [task2, task3])).ok()
    .expect(doneSection.exists).notOk()
})
