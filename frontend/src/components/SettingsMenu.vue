<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon color="grey lighten-1">
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ dateType }} on</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ displayDate }} {{ displayTime }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list class="menu-btns">
      <v-btn
        color="warning"
        fab
        small
        dark
        @click="editThis"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        color="error"
        fab
        small
        dark
        @click="deleteThis"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn
        v-if="clearAllBtn"
        color="error"
        @click="clearAll"
      >
        <span>{{ clearAllBtn }}</span>
      </v-btn>
    </v-list>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SettingsMenu',
  props: {
    dateType: {
      type: String,
      default: 'Created'
    },
    date: {
      type: String,
      default: ''
    },
    editThis: {
      type: Function,
      default: function () {}
    },
    deleteThis: {
      type: Function,
      default: function () {}
    },
    clearAllBtn: {
      type: String,
      default: null
    },
    clearAll: {
      type: Function,
      default: function () {}
    }
  },
  computed: {
    displayDate: function () {
      return moment(this.date).format('ddd MMM DD YYYY,')
    },
    displayTime: function () {
      return moment(this.date).format('h:mm a')
    }
  }
}
</script>

<style scoped>
  .menu-btns > button {
    margin-left: 8px;
  }
</style>
