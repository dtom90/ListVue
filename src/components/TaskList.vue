<template>
  <div class="section">
    <!-- Title Section -->
    <div class="title-section">
      <component
        :is="titleTag"
        v-if="!editName"
        @click="editName = true"
      >
        {{ title }}
      </component>
      <v-text-field
        v-if="editName"
        v-model="newListName"
        autofocus
        append-icon="mdi-content-save"
        @click:append="updateName"
        @keyup.enter="updateName"
        @blur="editName = false"
      />
      <v-btn
        v-if="completedList"
        color="error"
        @click="clearTasks"
      >
        <span>Clear All</span>
      </v-btn>
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
      default: 'To Do'
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
    editName: false,
    newListName: '',
    newTask: ''
  }),
  computed: {
    completedList: function () { return this.title === 'Completed' },
    titleTag: function () { return this.completedList ? 'h3' : 'h1' }
  },
  watch: {
    title () {
      this.newListName = this.title
    }
  },
  mounted () {
    this.newListName = this.title
  },
  methods: {
    ...mapMutations([
      'updateListName',
      'addTask',
      'clearTasks'
    ]),
    updateName () {
      this.editName = false
      this.updateListName({ newListName: this.newListName })
    },
    addNewTask () {
      this.addTask(this.newTask)
      this.newTask = ''
    }
  }
}
</script>

<style scoped>
  .title-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #new-task {
    margin-bottom: 10px;
  }
</style>
