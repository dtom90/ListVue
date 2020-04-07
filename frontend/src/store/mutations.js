import uuid from 'uuid/v1'
import getters from './getters'

const mutations = {
  saveLists (state, { lists }) {
    state.lists = lists
  },
  
  selectList (state, { listIndex }) {
    state.selected = listIndex
  },
  
  addList (state, { newListName }) {
    state.lists.push({
      id: uuid(),
      name: newListName,
      tasks: [],
      completed: []
    })
  },
  
  updateListName (state, { newListName }) {
    state.lists[state.selected].name = newListName
  },
  
  addTask (state, { newTaskName, addToBottom }) {
    const list = state.lists[state.selected]
    const newTask = {
      id: uuid(),
      name: newTaskName,
      completed: false,
      createdDate: new Date(),
      completedDate: null
    }
    if (addToBottom) {
      list.tasks.push(newTask)
    } else {
      list.tasks.unshift(newTask)
    }
  },

  updateIncompleteTasks (state, { newTaskOrder }) {
    state.lists[state.selected].tasks = newTaskOrder
  },
  
  completeTask (state, { taskId, completed }) {
    const list = state.lists[state.selected]
    const type = completed ? 'tasks' : 'completed'
    const index = list[type].findIndex(t => t.id === taskId)
    const task = list[type][index]
    list[type].splice(index, 1)
    if (completed) {
      task.completedDate = Date.now()
      list.completed.unshift(task)
    } else {
      task.completedDate = null
      list.tasks.push(task)
    }
  },
  
  deleteTask (state, { taskId, completed }) {
    const list = state.lists[state.selected][completed ? 'completed' : 'tasks']
    const index = list.findIndex(t => t.id === taskId)
    const task = list[index]
    if (completed || confirm(`Are you sure you want to delete task ${task.name}? the task is not yet complete!`)) {
      list.splice(index, 1)
    }
  },
  
  clearTasks (state) {
    const completedTasks = getters.completedTasks(state)
    if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      state.lists[state.selected].completed = []
    }
  }
}

export default mutations
