<template>
  <v-card>
    <v-list-item>
      <v-list-item-action>
        <v-checkbox
          v-model="task.completed"
          @change="completeThisTask"
        />
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title v-if="!editing">
          <span>{{ task.name }}</span>
        </v-list-item-title>
        <v-text-field
          v-if="editing"
          ref="taskNameInput"
          v-model="task.name"
          class="edit-task"
          filled
          append-icon="mdi-content-save"
          @click:append="editing = false"
          @keyup.enter="editing = false"
        />
      </v-list-item-content>

      <v-list-item-action>
        <SettingsMenu
          :date-type="dateType"
          :date="date"
          :edit-this="editThisTask"
          :delete-this="deleteThisTask"
        />
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import SettingsMenu from './SettingsMenu'

export default {
  name: 'Task',
  components: { SettingsMenu },
  props: {
    task: {
      type: Object,
      default: function () {
        return {
          id: 1,
          name: 'new task 1',
          createdDate: new Date(),
          completedDate: null,
          completed: false
        }
      }
    }
  },
  data: () => ({
    editing: false
  }),
  computed: {
    dateType: function () {
      return this.task.completed ? 'Completed' : 'Created'
    },
    date: function () {
      return this.task.completed ? this.task.completedDate : this.task.createdDate
    }
  },
  methods: {
    ...mapMutations([
      'completeTask',
      'deleteTask'
    ]),
    editThisTask () {
      this.editing = true
      this.$nextTick()
      this.$nextTick(function () {
        this.$refs.taskNameInput.$el.querySelector('input').focus()
      })
    },
    completeThisTask () {
      this.completeTask({
        taskId: this.task.id,
        completed: this.task.completed
      })
    },
    deleteThisTask () {
      this.deleteTask({
        taskId: this.task.id,
        completed: this.task.completed
      })
    }
  }
}
</script>

<style scoped>

</style>
