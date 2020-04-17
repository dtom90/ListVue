import getters from './getters'
import { get, post, patch, _delete } from './request'

const actions = {
  async loadLists ({ dispatch, commit }) {
    const lists = await get('/lists')
    commit('saveLists', { lists })
    dispatch('selectList', { index: 0 })
  },
  
  async selectList ({ state, commit }, { index }) {
    const id = state.lists[index].id
    const list = await get('/lists/' + id)
    commit('selectList', { index, tasks: list.tasks })
  },
  
  async createList ({ commit }, { newListName }) {
    const newList = await post('/lists', { list: { name: newListName } })
    commit('addList', newList)
  },
  
  async updateList ({ state, commit }, { newListName }) {
    const list = state.lists[state.selected]
    const newList = await patch('/lists/' + list.id, { list: { name: newListName } })
    commit('updateList', newList)
  },
  
  async deleteList ({ state, commit }) {
    const list = state.lists[state.selected]
    try {
      await _delete('/lists/' + list.id)
      commit('deleteList')
    } catch (e) {
      throw new Error(e)
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
    if (task.completed_at !== null || confirm(`Are you sure you want to delete task ${task.name}? the task is not yet complete!`)) {
      await _delete('/tasks/' + id)
      commit('deleteTask', { id })
    }
  },
  
  async clearTasks ({ state, dispatch }) {
    const index = state.selected
    const id = state.lists[index].id
    const completedTasks = state.tasks.filter(task => task.completed_at !== null)
    if (confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      await _delete(`/lists/${id}/tasks`)
      dispatch('selectList', { index })
    }
  }
}

export default actions
