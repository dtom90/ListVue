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
      <SettingsMenu
        v-if="!isCompletedList"
        :date="createdDate"
        :edit-this="editThisListName"
        :delete-this="deleteThisList"
        clear-all-btn="Clear Tasks"
        :clear-all="clearAllTasks"
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
    <v-row v-if="!isCompletedList">
      <v-col>
        <v-text-field
          id="new-task"
          ref="newTask"
          v-model="newTask"
          label="enter new task"
          @keyup.enter="addNewTask"
        />
      </v-col>
      
      <div id="add-to-container">
        <v-btn-toggle
          v-model="addToBottom"
          class="custom-icons"
          dense
        >
          <v-btn @click="keepFocus">
            <img
              src="../assets/add_to_top.svg"
              alt="Add to Top"
            >
          </v-btn>
          
          <v-btn @click="keepFocus">
            <img
              src="../assets/add_to_bottom.svg"
              alt="Add to Bottom"
            >
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-row>
    
    <!-- Task List -->
    <draggable
      v-model="incompleteTaskList"
      :disabled="isCompletedList"
      animation="200"
      delay="500"
      delay-on-touch-only="true"
      touch-start-threshold="4"
      class="task-list"
      @start="startDrag"
      @end="endDrag"
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
import SettingsMenu from './SettingsMenu.vue'
import { mapMutations, mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'List',
  components: {
    Task,
    SettingsMenu,
    draggable
  },
  props: {
    title: {
      type: String,
      default: 'To Do'
    },
    createdDate: {
      type: String,
      default: ''
    },
    tasks: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    editName: false,
    newListName: '',
    newTask: '',
    addToBottom: 1
  }),
  computed: {
    isCompletedList: function () {
      return this.title === 'Completed'
    },
    titleTag: function () {
      return this.isCompletedList ? 'h3' : 'h1'
    },
    incompleteTaskList: {
      get () {
        return this.tasks
      },
      set (newTaskOrder) {
        const idToOrder = {}
        newTaskOrder.forEach((task, i) => {
          idToOrder[task.id] = { order: i }
        })
        this.updateTasks({ tasks: idToOrder })
        this.rearrangeTasks({ idToOrder })
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
      'updateTasks'
    ]),
    ...mapActions([
      'updateList',
      'createTask',
      'rearrangeTasks',
      'clearTasks',
      'clearAllTasks',
      'deleteList'
    ]),
    editThisListName () {
      this.editName = true
    },
    updateName () {
      this.editName = false
      this.updateList({ newListName: this.newListName })
    },
    keepFocus () {
      this.$refs.newTask.$el.querySelector('input').focus()
    },
    addNewTask () {
      this.createTask({ name: this.newTask, addToBottom: this.addToBottom })
      this.newTask = ''
    },
    startDrag () {
      this.$el.closest('html').classList.add('draggable-cursor')
    },
    endDrag () {
      this.$el.closest('html').classList.remove('draggable-cursor')
    },
    deleteThisList () {
      this.deleteList()
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped lang="scss">
.title-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

#new-task {
  margin-bottom: 10px;
}

#add-to-container {
  padding: 26px 0 26px 0;
  
  img {
    width: 1.5em;
    height: 1.5em;
  }
}

.task {
  margin-bottom: 10px;
}

//noinspection CssInvalidPropertyValue
.draggable-task:hover {
  cursor: move; /* fallback: no `url()` support or images disabled */
  cursor: -webkit-grab; /* Chrome 1-21, Safari 4+ */
  cursor: -moz-grab; /* Firefox 1.5-26 */
  cursor: grab; /* W3C standards syntax, should come least */
}

.sortable-chosen {
  background-color: #E3F2FD;
}

//noinspection CssInvalidPropertyValue
.draggable-cursor * {
  cursor: move !important; /* fallback: no `url()` support or images disabled */
  cursor: -webkit-grabbing !important; /* Chrome 1-21, Safari 4+ */
  cursor: -moz-grabbing !important; /* Firefox 1.5-26 */
  cursor: grabbing !important; /* W3C standards syntax, should come least */
}
</style>
