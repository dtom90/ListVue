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
  }
}

export default actions
