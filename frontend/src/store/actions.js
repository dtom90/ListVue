const actions = {
  loadLists ({ commit }) {
    fetch('/lists')
      .then(stream => stream.json())
      .then(lists => { commit('saveLists', { lists }) })
      .catch(error => {
        throw new Error(`API ${error}`)
      })
  }
}

export default actions
