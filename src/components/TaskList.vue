<template>
  <div class="section">
    <!-- TaskList Title Section -->
    <div class="title-section">
      <!-- TaskList Title -->
      <component
        :is="titleTag"
        class="title"
      >
        {{ title }}
      </component>

      <!-- TaskList Settings Button -->
      <div class="dropright">
        <button
          :id="btnId"
          class="btn btn-light"
          data-toggle="dropdown"
        >
          <font-awesome-icon :icon="btnIcon" />
        </button>
        <div class="dropdown-menu">
          <div class="input-group">
            <select
              :id="selectId"
              v-model="sortOrder"
              class="custom-select"
            >
              <option
                v-for="option in sortingOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <div class="input-group-append">
              <label
                class="input-group-text"
                :for="selectId"
              >First</label>
            </div>
          </div>
          <div
            v-if="completedList"
            class="dropdown-divider"
          />
          <button
            v-if="completedList"
            id="clear-btn"
            class="btn btn-danger"
            @click="clearTasks"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- New Task Input Field -->
    <input
      v-if="!completedList"
      id="new-task"
      v-model="newTask"
      type="text"
      class="form-control"
      placeholder="enter new task"
      @keyup.enter="addNewTask"
    >

    <!-- TaskList -->
    <ul class="task-list list-group">
      <Task
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
      />
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Task from './Task.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSort, faBars } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'

$(document).on('click', '.title-section .dropdown-menu', function (e) {
  e.stopPropagation()
})

export default {
  name: 'TaskList',
  components: {
    Task,
    FontAwesomeIcon
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
    newTask: '',
    sortOrder: 'Oldest'
  }),
  computed: {
    completedList: function () { return this.title === 'Completed Tasks' },
    titleTag: function () { return this.completedList ? 'h3' : 'h1' },
    btnId: function () { return this.completedList ? 'completedSettingsButton' : 'todoSettingsButton' },
    btnIcon: function () { return this.completedList ? faBars : faSort },
    selectId: function () { return (this.completed ? 'completed' : 'toDo') + 'OrderGroupSelect' },
    sortingOptions: function () { return this.completedList ? [ 'Recent', 'Oldest' ] : [ 'Oldest', 'Newest' ] },
    sortedTasks: function () { return this.sortOrder !== 'Oldest' ? this.tasks.slice().reverse() : this.tasks }
  },
  mounted: function () {
    this.sortOrder = this.sortingOptions[0]
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

  #new-task {
    margin-bottom: 10px;
  }

  .title-section {
    display: flex;
    align-items: flex-end;
  }

  .title {
    flex: 1;
    margin-left: 40px;
  }

  .title-section > .dropright {
    height: 42px;
    margin-bottom: 4px;
  }

</style>
