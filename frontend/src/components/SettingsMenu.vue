<template>
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
          <v-list-item-title>{{ dateType }} on</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ displayDate }} {{ displayTime }}</span>
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
        @click="editThis"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        color="error"
        fab
        small
        dark
        class="menu-btn"
        @click="deleteThis"
      >
        <v-icon>mdi-delete</v-icon>
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
      type: Date,
      default: new Date(0)
    },
    editThis: {
      type: Function,
      default: function () {}
    },
    deleteThis: {
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
  .menu-btn {
    margin-left: 8px;
  }
</style>
