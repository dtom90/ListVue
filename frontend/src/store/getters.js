const getters = {
  selectedList (state) {
    return state.selected in state.lists ? state.lists[state.selected] : null
  },

  incompleteTasks (state) {
    return state.tasks
  },

  completedTasks (state) {
    return state.completed
  }
}

export default getters
