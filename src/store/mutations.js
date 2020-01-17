const mutations = {
  addTask (state, newTaskName) {
    const list = state.lists.find(list => list.name === state.selected)
    const newTask = {
      id: list.tasks.length,
      name: newTaskName,
      completed: false,
      createdDate: new Date(),
      completedDate: null
    }
    list.tasks.push(newTask)
  },

  completeTask (state, id) {
    const list = state.lists.find(list => list.name === state.selected)
    const task = list.tasks.find(t => t.id === id)
    if (task.completed) { task.completedDate = Date.now() } else { task.completedDate = null }
  },

  deleteTask (state, id) {
    const list = state.lists.find(list => list.name === state.selected)
    const index = list.tasks.findIndex(t => t.id === id)
    const task = list.tasks[index]
    if (task.completed || confirm(`Are you sure you want to delete task ${task.name}? the task is not yet complete!`)) {
      list.tasks.splice(index, 1)
    }
  },

  clearTasks (state) {
    const list = state.lists.find(list => list.name === state.selected)
    const completedTasks = list.tasks.filter(t => t.completed)
    if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      list.tasks = list.tasks.filter(t => !t.completed)
    }
  }
}

export default mutations
