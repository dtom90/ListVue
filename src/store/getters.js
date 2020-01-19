const getters = {
  selectedList (state) {
    return state.lists[state.selected]
  },

  incompleteTasks (state) {
    const list = state.lists[state.selected]
    const incompleteTasks = list.tasks.filter(t => !t.completed)
    return state.incompleteOrder === 'Newest' ? incompleteTasks.reverse() : incompleteTasks
  },

  completedTasks (state) {
    const list = state.lists[state.selected]
    const completedTasks = list.tasks.filter(t => t.completed).sort((a, b) => a.completedDate - b.completedDate)
    return state.completedOrder === 'Recent' ? completedTasks.reverse() : completedTasks
  }
}

export default getters
