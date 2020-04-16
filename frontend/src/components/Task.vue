<template>
  <v-card>
    <v-list-item>
      <v-list-item-action>
        <v-checkbox
          :input-value="completed"
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
import { mapMutations, mapActions } from 'vuex'
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
          name: 'default task',
          created_at: (new Date()).toISOString(),
          completed_at: null
        }
      }
    }
  },
  data: () => ({
    editing: false
  }),
  computed: {
    completed: function () {
      return this.task.completed_at !== null
    },
    dateType: function () {
      return this.task.completed ? 'Completed' : 'Created'
    },
    date: function () {
      return this.task.completed ? this.task.updated_at : this.task.created_at
    }
  },
  methods: {
    ...mapActions([
      'updateTask'
    ]),
    ...mapMutations([
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
      const completed_at = this.completed ? null : (new Date()).toISOString() // eslint-disable-line camelcase
      this.updateTask({ id: this.task.id, completed_at })
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
