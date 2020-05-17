const getters = {
  selectedList (state) {
    return state.selected in state.lists ? state.lists[state.selected] : null
  },
  
  incompleteTasks (state) {
    const incomplete = state.tasks.filter(task => task.completed_at === null)
    incomplete.sort((a, b) => a.order - b.order)
    return incomplete
  },
  
  completedTasks (state) {
    const completed = state.tasks.filter(task => task.completed_at !== null)
    completed.sort((a, b) => Date.parse(b.completed_at) - Date.parse(a.completed_at))
    return completed
  }
}

export default getters
