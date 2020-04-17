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
  
  /* eslint-disable camelcase */
  updateTask (state, updatedTask) {
    const index = state.tasks.findIndex(t => t.id === updatedTask.id)
    Vue.set(state.tasks, index, updatedTask)
  },
  /* eslint-enable camelcase */
  
  deleteTask (state, { id }) {
    const index = state.tasks.findIndex(t => t.id === id)
    Vue.delete(state.tasks, index)
  },
  
  clearTasks (state) {
    const completedTasks = getters.completedTasks(state)
    if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      state.lists[state.selected].completed = []
    }
  }
}

export default mutations
