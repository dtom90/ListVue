import { get, post, patch, _delete } from './request'

const actions = {
  async loadLists ({ dispatch, commit }) {
    const lists = await get('/lists')
    commit('saveLists', { lists })
    dispatch('loadList', { id: lists[0].id })
  },
  
  async loadList ({ commit }, { id }) {
    await get('/lists/' + id)
    commit('selectList', { listIndex: 0 })
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
  }
}

export default actions
