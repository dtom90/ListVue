import getters from './getters'
import { get, post, patch, _delete } from './request'

const actions = {
  async login ({ dispatch }, { email, password }) {
    const resp = await post('/users/login', {
      user: { email, password }
    })
    console.log(resp)
    window.sessionStorage.token = resp.user.token
  },
  
  async loadLists ({ dispatch, commit }) {
    const lists = await get('/lists')
    commit('saveLists', { lists })
    dispatch('selectList', { index: 0 })
  },
  
  async selectList ({ state, commit }, { index }) {
    if (index < state.lists.length) {
      const id = state.lists[index].id
      const list = await get('/lists/' + id)
      commit('selectList', { index, tasks: list.tasks })
    }
  },
  
  async createList ({ commit, dispatch, state }, { newListName }) {
    const newList = await post('/lists', { list: { name: newListName } })
    commit('addList', newList)
    dispatch('selectList', { index: state.lists.length - 1 })
  },
  
  async updateList ({ state, commit }, { newListName }) {
    const list = state.lists[state.selected]
    const newList = await patch('/lists/' + list.id, { list: { name: newListName } })
    commit('updateList', newList)
  },
  
  async deleteList ({ state, commit }) {
    const list = state.lists[state.selected]
    if (confirm(`Are you sure that you want to delete the list "${list.name}"?`)) {
      try {
        await _delete('/lists/' + list.id)
        commit('deleteList')
      } catch (e) {
        throw new Error(e)
      }
    }
  },
  
  async createTask ({ state, commit }, { name }) { //, addToBottom
    const newTask = await post('/tasks', { task: { name, list_id: getters.selectedList(state).id } })
    commit('addTask', newTask)
  },
  
  async updateTask ({ commit }, params) {
    const { id, ...patchParams } = params
    const newTask = await patch('/tasks/' + id, { task: patchParams })
    commit('updateTask', newTask)
  },
  
  async deleteTask ({ state, commit }, { id }) {
    const task = state.tasks.find(t => t.id === id)
    if (task.completed_at !== null || confirm(`Are you sure that you want to delete "${task.name}"? The task is not yet complete!`)) {
      await _delete('/tasks/' + id)
      commit('deleteTask', { id })
    }
  },
  
  async clearTasks ({ state, dispatch }) {
    const completedTasks = state.tasks.filter(task => task.completed_at !== null)
    if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      const index = state.selected
      const id = state.lists[index].id
      await _delete(`/lists/${id}/tasks/completed`)
      dispatch('selectList', { index })
    }
  },
  
  async clearAllTasks ({ state, dispatch }) {
    if (state.tasks.length > 0) {
      const question = state.tasks.length === 1 ? `Are you sure you want to delete task "${state.tasks[0].name}"?`
        : `Are you sure that you want to delete all ${state.tasks.length} tasks from this list?`
      if (confirm(question)) {
        const index = state.selected
        const id = state.lists[index].id
        await _delete(`/lists/${id}/tasks`)
        dispatch('selectList', { index })
      }
    }
  }
}

export default actions
