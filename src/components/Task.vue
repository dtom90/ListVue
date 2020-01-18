<template>
  <v-list-item>
    <template v-slot:default="{ active }">
      <v-list-item-action>
        <v-checkbox v-model="active" />
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{ task.name }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script>
import { mapMutations } from 'vuex'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsisH, faPencilAlt, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

export default {
  name: 'Task',
  components: {
    // FontAwesomeIcon
  },
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
      return moment(this.date).format('ddd MMM DD YYYY,')
    },
    displayTime: function () {
      return moment(this.date).format('h:mm a')
    },
    icon () {
      return { faEllipsisH, faPencilAlt, faSave, faTrashAlt }
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

<style scoped lang="scss">
  .task {
    text-align: left;
  }

  /* Adapted from https://hackernoon.com/hacking-custom-checkboxes-and-radios-5d48230440d */

  $checkbox-size: 2rem;

  .checkbox-container {
    margin-right: 20px;
    position: relative;
    width: $checkbox-size;
    height: $checkbox-size;
  }

  .checkbox-container > * {
    position: absolute;
    width: $checkbox-size;
    height: $checkbox-size;
  }

  /* Styles for hiding the native checkbox */
  .task-checkbox {
    z-index: 2;
    opacity: 0;
    cursor: pointer;
  }

  /* Styles for the basic appearance of the custom checkbox */
  .check-custom {
    border: 2px solid #969696;
    border-radius: 50%;
  }

  /* Styles for the hover state of the custom checkbox */
  .task-checkbox:hover ~ .check-custom {
    border-color: #4a4a4a;
  }

  /* Styles for the focus state of the custom checkbox */
  .task-checkbox:focus ~ .check-custom {
    border-color: #b0d5ff;
    box-shadow: 0 0 0 2px rgba(23, 133, 255, 0.25);
  }

  /* Styles for the checked state of the custom checkbox */
  .task-checkbox:checked ~ .check-custom {
    border-color: #1785ff;
    background: #1785ff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
    background-size: 75%;
  }

  .dropdown-menu > :not(.dropdown-divider) {
    margin-left: 8px;
  }

  .dropdown-menu button {
    margin-right: 8px;
  }
</style>
