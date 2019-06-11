import Vue from 'vue'
import App from './App.vue'

// Boostrap style
import 'bootstrap/dist/css/bootstrap.css'
// Bootstrap function
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Font Awesome icons
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt, faSave, faCog, faEllipsisH, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faSave, faCog, faEllipsisH, faPencilAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const store = {
  
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

new Vue({
  render: h => h(App),
  data: store
}).$mount('#app')
