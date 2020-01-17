const getters = {
  incompleteTasks (state) {
    const incompleteTasks = state.tasks.filter(t => !t.completed)
    return state.incompleteOrder === 'Newest' ? incompleteTasks.reverse() : incompleteTasks
  },

  completedTasks (state) {
    const completedTasks = state.tasks.filter(t => t.completed).sort((a, b) => a.completedDate - b.completedDate)
    return state.completedOrder === 'Recent' ? completedTasks.reverse() : completedTasks
  }
}

export default getters
