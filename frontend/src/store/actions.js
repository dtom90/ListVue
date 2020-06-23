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
  
  async loadLists ({ state, dispatch, commit }) {
    try {
      const lists = await get('/lists')
      commit('saveLists', { lists })
      if (state.lists.length > 0) {
        dispatch('loadList', { id: state.lists[0].id })
      }
    } catch (e) { handleError(e) }
  },
  
  async loadList ({ state, commit }, { id = null }) {
    if (id === null) {
      id = state.selected
    } else {
      commit('selectList', { id })
    }
    try {
      const list = await get('/lists/' + id)
      commit('saveTasks', { tasks: list.tasks })
    } catch (e) { handleError(e) }
  },
  
  async createList ({ commit, dispatch, state }, { newListName }) {
    try {
      const newList = await post('/lists', { list: { name: newListName } })
      commit('addList', { newList })
      commit('selectList', { id: newList.id })
    } catch (e) { handleError(e) }
  },
  
  async updateList ({ state, commit }, { newListName }) {
    try {
      const newList = await patch('/lists/' + state.selected, { list: { name: newListName } })
      commit('updateList', { newList })
    } catch (e) { handleError(e) }
  },
  
  async rearrangeLists ({ state, commit }, { idToOrder }) {
    try {
      await patch('/lists', { lists: { list_fields: idToOrder } })
    } catch (e) { handleError(e) }
  },
  
  async deleteList ({ state, commit }) {
    const list = getters.selectedList(state)
    if (confirm(`Are you sure that you want to delete the list "${list.name}"?`)) {
      try {
        await _delete('/lists/' + state.selected)
        commit('deleteList')
      } catch (e) { handleError(e) }
    }
  },
  
  async createTask ({ state, dispatch }, { name, addToBottom }) {
    try {
      await post('/tasks', {
        task: {
          name,
          list_id: state.selected,
          add_to_bottom: addToBottom === 1
        }
      })
      dispatch('loadList', {})
    } catch (e) { handleError(e) }
  },
  
  async updateTask ({ commit }, params) {
    const { id, ...patchParams } = params
    try {
      const updatedTask = await patch('/tasks/' + id, { task: patchParams })
      commit('updateTask', { updatedTask })
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
      try {
        await _delete(`/lists/${state.selected}/tasks/completed`)
        dispatch('loadList', {})
      } catch (e) { handleError(e) }
    }
  },
  
  async clearAllTasks ({ state, dispatch }) {
    if (state.tasks.length > 0) {
      const question = state.tasks.length === 1 ? `Are you sure you want to delete task "${state.tasks[0].name}"?`
        : `Are you sure that you want to delete all ${state.tasks.length} tasks from this list?`
      if (confirm(question)) {
        try {
          await _delete(`/lists/${state.selected}/tasks`)
          dispatch('loadList', {})
        } catch (e) { handleError(e) }
      }
    }
  }
}

export default actions
