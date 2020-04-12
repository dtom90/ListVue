const actions = {
  loadLists ({ dispatch, commit }) {
    fetch('/lists')
      .then(stream => stream.json())
      .then(lists => {
        commit('saveLists', { lists })
        dispatch('loadList', { id: lists[0].id })
      })
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  },
  
  loadList ({ commit }, { id }) {
    fetch('/lists/' + id)
      .then(stream => stream.json())
      .then(() => commit('selectList', { listIndex: 0 }))
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  },
  
  createList ({ commit }, { newListName }) {
    fetch('/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list: { name: newListName } })
    })
      .then(stream => stream.json())
      .then(newList => commit('addList', newList))
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  },
  
  updateList ({ state, commit }, { newListName }) {
    const list = state.lists[state.selected]
    fetch('/lists/' + list.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ list: { name: newListName } })
    })
      .then(stream => stream.json())
      .then(newList => commit('updateList', newList))
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  }
}

export default actions
