const getters = {
  selectedList (state) {
    return state.selected in state.lists ? state.lists[state.selected].name : null
  },

  incompleteTasks (state) {
    const list = state.lists[state.selected]
    return list.tasks
  },

  completedTasks (state) {
    const list = state.lists[state.selected]
    return list.completed
  }
}

export default getters
