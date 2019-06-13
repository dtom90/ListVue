export default {

  tasks: [],
  order: 'Oldest',
  completedOrder: 'Recent',

  incompleteTasks() {
    const incompleteTasks = this.tasks.filter(t => !t.completed)
    return this.order === 'Newest' ? incompleteTasks.reverse() : incompleteTasks
  },

  completedTasks() {
    const completedTasks = this.tasks.filter(t => t.completed).sort((a,b) => a.completedDate - b.completedDate)
    return this.completedOrder === 'Recent' ? completedTasks.reverse() : completedTasks
  },

  addTask(newTaskName) {
    const newTask = {
      id: this.tasks.length,
      name: newTaskName,
      completed: false,
      createdDate: new Date(),
      completedDate: null
    }
    this.tasks.push(newTask)
  },

  completeTask(id) {
    const task = this.tasks.find(t => t.id === id)
    if(task.completed)
      task.completedDate = Date.now()
    else
      task.completedDate = null
  },

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id)
    const task = this.tasks[index];
    if (task.completed || confirm(`Are you sure you want to delete task ${task.name}? the task is not yet complete!`)) {
      this.tasks.splice(index, 1);
    }
  },

  clearTasks() {
    const completedTasks = this.tasks.filter(t => t.completed)
    if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
      this.tasks = this.tasks.filter(t => !t.completed)
    }
  }

}
