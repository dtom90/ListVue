import Vue from 'vue'
import initialState from './initialState'

const mutations = {
  setEmail (state, { email }) {
    state.email = email
  },
  
  saveLists (state, { lists }) {
    state.lists = lists
  },
  
  selectList (state, { index, tasks }) {
    state.selected = index
    state.tasks = tasks
  },
  
  addList (state, newList) {
    state.lists.push(newList)
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
  
  resetState (state) {
    Object.entries(initialState).forEach(([key, value]) => {
      Vue.set(state, key, value)
    })
  }
}

export default mutations
