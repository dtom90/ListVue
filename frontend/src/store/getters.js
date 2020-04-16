const getters = {
  selectedList (state) {
    return state.selected in state.lists ? state.lists[state.selected] : null
  },

  incompleteTasks (state) {
    return state.tasks.filter(task => task.completed_at === null)
  },

  completedTasks (state) {
    return state.tasks.filter(task => task.completed_at !== null)
  }
}

export default getters
