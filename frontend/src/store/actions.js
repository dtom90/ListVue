import getters from './getters'
import { get, post, patch, _delete } from './request'

function handleError () {
  alert('An error occurred while communicating with the server')
}

const actions = {
  async checkSignIn ({ commit, dispatch }) {
    if ('token' in window.localStorage) {
      try {
        const resp = await get('/user')
        commit('setEmail', { email: resp.user.email })
        dispatch('loadLists')
      } catch (e) { handleError(e) }
    }
  },
  
  async login ({ commit, dispatch }, { email, password }) {
    try {
      const resp = await post('/users/login', {
        user: { email, password }
      })
      if ('user' in resp && 'token' in resp.user) {
        window.localStorage.token = resp.user.token
        commit('setEmail', { email: resp.user.email })
        dispatch('loadLists')
      } else {
        alert('Login Failed')
      }
    } catch (e) { handleError(e) }
  },
  
  async logOut ({ commit }) {
    window.localStorage.removeItem('token')
    commit('resetState')
  },
  
  async loadLists ({ dispatch, commit }) {
    try {
      const lists = await get('/lists')
      commit('saveLists', { lists })
      dispatch('selectList', { index: 0 })
    } catch (e) { handleError(e) }
  },
  
  async selectList ({ state, commit }, { index = null }) {
    if (index === null) {
      index = state.selected
    }
    if (index < state.lists.length) {
      const id = state.lists[index].id
      try {
        const list = await get('/lists/' + id)
        commit('selectList', { index, tasks: list.tasks })
      } catch (e) { handleError(e) }
    }
  },
  
  async createList ({ commit, dispatch, state }, { newListName }) {
    try {
      const newList = await post('/lists', { list: { name: newListName } })
      commit('addList', newList)
      dispatch('selectList', { index: state.lists.length - 1 })
    } catch (e) { handleError(e) }
  },
  
  async updateList ({ state, commit }, { newListName }) {
    const list = state.lists[state.selected]
    try {
      const newList = await patch('/lists/' + list.id, { list: { name: newListName } })
      commit('updateList', newList)
    } catch (e) { handleError(e) }
  },
  
  async rearrangeLists ({ state, commit }, { idToOrder }) {
    try {
      await patch('/lists', { lists: { list_fields: idToOrder } })
    } catch (e) { handleError(e) }
  },
  
  async deleteList ({ state, commit }) {
    const list = state.lists[state.selected]
    if (confirm(`Are you sure that you want to delete the list "${list.name}"?`)) {
      try {
        await _delete('/lists/' + list.id)
        commit('deleteList')
      } catch (e) { handleError(e) }
    }
  },
  
  async createTask ({ state, dispatch }, { name, addToBottom }) {
    try {
      await post('/tasks', {
        task: {
          name,
          list_id: getters.selectedList(state).id,
          add_to_bottom: addToBottom === 1
        }
      })
      dispatch('selectList', {})
    } catch (e) { handleError(e) }
  },
  
  async updateTask ({ commit }, params) {
    const { id, ...patchParams } = params
    try {
      const newTask = await patch('/tasks/' + id, { task: patchParams })
      commit('updateTask', newTask)
    } catch (e) { handleError(e) }
  },
  
  async rearrangeTasks ({ state, commit }, { idToOrder }) {
    const index = state.selected
    const id = state.lists[index].id
    try {
      await patch(`/lists/${id}/tasks`, { list: { tasks: idToOrder } })
    } catch (e) { handleError(e) }
  },
  
  async deleteTask ({ state, commit }, { id }) {
    const task = state.tasks.find(t => t.id === id)
    if (task.completed_at !== null || confirm(`Are you sure that you want to delete "${task.name}"? The task is not yet complete!`)) {
      try {
        await _delete('/tasks/' + id)
        commit('deleteTask', { id })
      } catch (e) { handleError(e) }
    }
  },
  
  async clearTasks ({ state, dispatch }) {
    const completedTasks = state.tasks.filter(task => task.completed_at !== null)
    if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      const index = state.selected
      const id = state.lists[index].id
      try {
        await _delete(`/lists/${id}/tasks/completed`)
        dispatch('selectList', { index })
      } catch (e) { handleError(e) }
    }
  },
  
  async clearAllTasks ({ state, dispatch }) {
    if (state.tasks.length > 0) {
      const question = state.tasks.length === 1 ? `Are you sure you want to delete task "${state.tasks[0].name}"?`
        : `Are you sure that you want to delete all ${state.tasks.length} tasks from this list?`
      if (confirm(question)) {
        const index = state.selected
        const id = state.lists[index].id
        try {
          await _delete(`/lists/${id}/tasks`)
          dispatch('selectList', { index })
        } catch (e) { handleError(e) }
      }
    }
  }
}

export default actions
