import Vue from 'vue'
import uuid from 'uuid/v1'
import getters from './getters'

const mutations = {
  saveLists (state, { lists }) {
    state.lists = lists
  },
  
  selectList (state, { listIndex }) {
    state.selected = listIndex
  },
  
  addList (state, newList) {
    state.lists.push(newList)
    state.selected = state.lists.length - 1
  },
  
  updateList (state, newList) {
    Vue.set(state.lists, state.selected, newList)
  },
  
  addTask (state, { newTaskName, addToBottom }) {
    const newTask = {
      id: uuid(),
      name: newTaskName,
      completed: false,
      createdDate: new Date(),
      completedDate: null
    }
    if (addToBottom) {
      state.tasks.push(newTask)
    } else {
      state.tasks.unshift(newTask)
    }
  },

  updateIncompleteTasks (state, { newTaskOrder }) {
    state.tasks = newTaskOrder
  },
  
  completeTask (state, { taskId, completed }) {
    const type = completed ? 'tasks' : 'completed'
    const index = state[type].findIndex(t => t.id === taskId)
    const task = state[type][index]
    state[type].splice(index, 1)
    if (completed) {
      task.completedDate = Date.now()
      state.completed.unshift(task)
    } else {
      task.completedDate = null
      state.tasks.push(task)
    }
  },
  
  deleteTask (state, { taskId, completed }) {
    const list = state[completed ? 'completed' : 'tasks']
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
