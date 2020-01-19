<template>
  <div class="section">
    <!-- TaskList Title Section -->
    <div class="title-section">
      <component
        :is="titleTag"
      >
        {{ title }}
      </component>
    </div>

    <!-- New Task Input Field -->
    <v-text-field
      v-if="!completedList"
      id="new-task"
      v-model="newTask"
      label="enter new task"
      @keyup.enter="addNewTask"
    />

    <!-- TaskList -->
    <div class="task-list">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Task from './Task.vue'

export default {
  name: 'TaskList',
  components: {
    Task
  },
  props: {
    title: {
      type: String,
      default: 'To Do List'
    },
    tasks: {
      type: Array,
      default: function () {
        return [
          { id: 1, name: 'new task 1' },
          { id: 2, name: 'new task 2' },
          { id: 3, name: 'new task 3' }
        ]
      }
    }
  },
  data: () => ({
    newTask: ''
  }),
  computed: {
    completedList: function () { return this.title === 'Completed Tasks' },
    titleTag: function () { return this.completedList ? 'h3' : 'h1' }
  },
  methods: {
    ...mapMutations([
      'addTask',
      'clearTasks'
    ]),
    addNewTask () {
      this.addTask(this.newTask)
      this.newTask = ''
    }
  }
}
</script>

<style scoped>
  .title-section {
    margin-bottom: 10px;
  }

  #new-task {
    margin-bottom: 10px;
  }
</style>
