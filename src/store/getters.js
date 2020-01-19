const getters = {
  selectedList (state) {
    return state.lists[state.selected]
  },

  incompleteTasks (state) {
    const list = state.lists[state.selected]
    return list.tasks.filter(t => !t.completed)
  },

  completedTasks (state) {
    const list = state.lists[state.selected]
    return list.tasks.filter(t => t.completed).reverse()
  }
}

export default getters
