const getters = {
  incompleteTasks (state) {
    const list = state.lists.find(list => list.name === state.selected)
    const incompleteTasks = list.tasks.filter(t => !t.completed)
    return state.incompleteOrder === 'Newest' ? incompleteTasks.reverse() : incompleteTasks
  },

  completedTasks (state) {
    const list = state.lists.find(list => list.name === state.selected)
    const completedTasks = list.tasks.filter(t => t.completed).sort((a, b) => a.completedDate - b.completedDate)
    return state.completedOrder === 'Recent' ? completedTasks.reverse() : completedTasks
  }
}

export default getters
