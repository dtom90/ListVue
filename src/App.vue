<template>
  <div
    id="app"
    class="container"
  >
    <TaskList
      title="To Do List"
      :tasks="incompleteTasks"
    />
    <br>
    <br>

    <TaskList
      v-if="completedTasks.length > 0"
      title="Completed Tasks"
      :tasks="completedTasks"
    />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    TaskList
  },
  computed: {
    ...mapGetters([
      'incompleteTasks',
      'completedTasks'
    ])
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    max-width: 500px;
  }
</style>
