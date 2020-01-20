const getters = {
  selectedList (state) {
    return state.lists[state.selected].name
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
