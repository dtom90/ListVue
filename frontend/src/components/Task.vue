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
          v-model="name"
          class="edit-task"
          filled
          append-icon="mdi-content-save"
          @click:append="saveName"
          @keyup.enter="saveName"
        />
      </v-list-item-content>
      
      <v-list-item-action>
        <SettingsMenu
          :date-type="dateType"
          :date="date"
          :list-id="task.list_id"
          :edit-this="editThisTask"
          :move-this="moveThisTask"
          :delete-this="deleteThisTask"
        />
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
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
    editing: false,
    name: null
  }),
  computed: {
    completed: function () {
      return this.task.completed_at !== null
    },
    dateType: function () {
      return this.completed ? 'Completed' : 'Created'
    },
    date: function () {
      return this.completed ? this.task.completed_at : this.task.created_at
    }
  },
  watch: {
    task () {
      this.name = this.task.name
    }
  },
  mounted () {
    this.name = this.task.name
  },
  methods: {
    ...mapActions([
      'loadList',
      'updateTask',
      'deleteTask'
    ]),
    editThisTask () {
      this.editing = true
      this.$nextTick()
      this.$nextTick(function () {
        this.$refs.taskNameInput.$el.querySelector('input').focus()
      })
    },
    saveName () {
      this.editing = false
      this.updateTask({ id: this.task.id, name: this.name })
    },
    moveThisTask (newListId) {
      this.updateTask({ id: this.task.id, list_id: newListId })
      this.$nextTick(() => {
        this.loadList({})
      })
    },
    completeThisTask () {
      const completed_at = this.completed ? null : (new Date()).toISOString() // eslint-disable-line camelcase
      this.updateTask({ id: this.task.id, completed_at })
    },
    deleteThisTask () {
      this.deleteTask({ id: this.task.id })
    }
  }
}
</script>

<style scoped>

</style>
