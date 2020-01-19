<template>
  <v-card style="margin-bottom: 10px;">
    <v-list-item>
      <v-list-item-action>
        <v-checkbox
          v-model="task.completed"
          @change="completeTask(task.id)"
        />
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title v-if="!editing">
          {{ task.name }}
        </v-list-item-title>
        <v-text-field
          v-if="editing"
          v-model="task.name"
          @keyup.enter="editing = false"
        />
      </v-list-item-content>

      <v-list-item-action>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon color="grey lighten-1">
                mdi-information
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{ dateType }} at</v-list-item-title>
                <v-list-item-subtitle>
                  {{ displayTime }} {{ displayDate }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list>
            <v-btn
              color="warning"
              fab
              small
              dark
              class="menu-btn"
              @click="editing = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="error"
              fab
              small
              dark
              class="menu-btn"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'Task',
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
    },
    displayDate: function () {
      return moment(this.date).format('ddd MMM DD YYYY')
    },
    displayTime: function () {
      return moment(this.date).format('h:mm a')
    }
  },
  methods: {
    ...mapMutations([
      'completeTask',
      'deleteTask'
    ])
  }
}
</script>

<style scoped>
  .menu-btn {
    margin-left: 8px;
  }
</style>
