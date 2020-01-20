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
        v-if="isCompletedList"
        color="error"
        @click="clearTasks"
      >
        <span>Clear All</span>
      </v-btn>
    </div>

    <!-- New Task Input Field -->
    <v-text-field
      v-if="!isCompletedList"
      id="new-task"
      v-model="newTask"
      label="enter new task"
      @keyup.enter="addNewTask"
    />

    <!-- TaskList -->
    <draggable
      v-model="incompleteTaskList"
      :disabled="isCompletedList"
      v-bind="dragOptions"
      class="task-list"
    >
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :class="'task' + (isCompletedList ? '' : ' draggable-task')"
      />
    </draggable>
  </div>
</template>

<script>
import Task from './Task.vue'
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'TaskList',
  components: {
    Task,
    draggable
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
    isCompletedList: function () { return this.title === 'Completed' },
    titleTag: function () { return this.isCompletedList ? 'h3' : 'h1' },
    incompleteTaskList: {
      get () {
        return this.tasks
      },
      set (newTaskOrder) {
        this.updateIncompleteTasks({ newTaskOrder })
      }
    },
    dragOptions () {
      return {
        animation: 200,
        disabled: false
      }
    }
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
      'updateIncompleteTasks',
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

<!--suppress CssUnusedSymbol -->
<style scoped>
  .title-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #new-task {
    margin-bottom: 10px;
  }

  .task {
    margin-bottom: 10px;
  }

  .draggable-task:hover {
    cursor: pointer;
  }

  .sortable-chosen {
    background-color: #E3F2FD;
    cursor: move;
  }
</style>
