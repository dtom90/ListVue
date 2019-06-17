<template>
  <li class="task list-group-item form-check">
    <div class="d-flex">
      <!--  Main Section (Flex Grow)  -->
      <div class="flex-grow-1 d-flex align-items-center">
        <!--  Checkbox Container  -->
        <div class="checkbox-container">
          <input
            v-model="task.completed"
            class="task-checkbox"
            type="checkbox"
            @change="completeTask(task.id)"
          >
          <span class="check-custom" />
        </div>

        <!--  Task Name & Field (when editing)  -->
        <span
          v-if="!editing"
          @click="editing = true"
        >{{ task.name }}</span>
        <div
          v-if="editing"
          class="d-flex align-items-center"
        >
          <input
            v-model="task.name"
            class="edit-task"
            @keyup.enter="editing = false"
          >
          <button
            type="button"
            class="btn btn-primary"
            @click="editing = false"
          >
            <font-awesome-icon icon="save" />
          </button>
        </div>
      </div>

      <!--  Task Settings Button  -->
      <div class="dropright">
        <button
          type="button"
          class="btn btn-light"
          data-toggle="dropdown"
        >
          <font-awesome-icon icon="ellipsis-h" />
        </button>
        <div class="dropdown-menu">
          <h6>
            {{ dateType }} on
          </h6>
          <div>
            {{ displayDate }}
          </div>
          <div>
            {{ displayTime }}
          </div>
          <div class="dropdown-divider" />
          <div class="flex-column">
            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editing = true"
            >
              <font-awesome-icon icon="pencil-alt" />
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="deleteTask(task.id)"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import moment from 'moment'
import { mapMutations } from 'vuex'

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
      return moment(this.date).format('ddd MMM DD YYYY,')
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
