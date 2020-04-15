import Vue from 'vue'
import getters from './getters'

const mutations = {
  saveLists (state, { lists }) {
    state.lists = lists
  },
  
  selectList (state, { listIndex, tasks }) {
    state.selected = listIndex
    state.tasks = tasks
  },
  
  addList (state, newList) {
    state.lists.push(newList)
    state.selected = state.lists.length - 1
  },
  
  updateList (state, newList) {
    Vue.set(state.lists, state.selected, newList)
  },
  
  deleteList (state) {
    Vue.delete(state.lists, state.selected)
  },
  
  addTask (state, newTask) {
    state.tasks.push(newTask)
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
