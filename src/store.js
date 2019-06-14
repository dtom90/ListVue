import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    tasks: [],
    order: 'Oldest',
    completedOrder: 'Recent',
  },

  getters: {
    incompleteTasks(state) {
      const incompleteTasks = state.tasks.filter(t => !t.completed)
      return state.order === 'Newest' ? incompleteTasks.reverse() : incompleteTasks
    },

    completedTasks(state) {
      const completedTasks = state.tasks.filter(t => t.completed).sort((a,b) => a.completedDate - b.completedDate)
      return state.completedOrder === 'Recent' ? completedTasks.reverse() : completedTasks
    }
  },
  
  mutations: {
    
    addTask(state, newTaskName) {
      const newTask = {
        id: state.tasks.length,
        name: newTaskName,
        completed: false,
        createdDate: new Date(),
        completedDate: null
      }
      state.tasks.push(newTask)
    },

    completeTask(state, id) {
      const task = state.tasks.find(t => t.id === id)
      if(task.completed)
        task.completedDate = Date.now()
      else
        task.completedDate = null
    },

    deleteTask(state, id) {
      const index = state.tasks.findIndex(t => t.id === id)
      const task = state.tasks[index];
      if (task.completed || confirm(`Are you sure you want to delete task ${task.name}? the task is not yet complete!`)) {
        state.tasks.splice(index, 1);
      }
    },

    clearTasks(state) {
      const completedTasks = state.tasks.filter(t => t.completed)
      if (completedTasks.length === 1 || confirm(`Are you sure that you want to delete all ${completedTasks.length} completed tasks?`)) {
        state.tasks = state.tasks.filter(t => !t.completed)
      }
    }
  }

})
