<template>
  <v-menu
    v-model="menuShown"
    offset-y
    :close-on-content-click="false"
  >
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
      <v-list-item>
        <v-select
          v-model="selectedList"
          :items="lists"
          item-text="name"
          item-value="id"
          single-line
        />
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list class="menu-btns">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="warning"
            fab
            small
            dark
            v-bind="attrs"
            v-on="on"
            @click="editThis"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit name</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="error"
            fab
            small
            dark
            v-bind="attrs"
            v-on="on"
            @click="deleteThis"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
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
import { mapState } from 'vuex'

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
    listId: {
      type: Number,
      default: null
    },
    moveThis: {
      type: Function,
      default: null
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
  data: () => ({
    menuShown: false
  }),
  computed: {
    ...mapState([
      'lists'
    ]),
    selectedList: {
      get () {
        return this.lists.find(list => list.id === this.listId)
      },
      set (newList) {
        this.moveThis(newList)
        this.menuShown = false
      }
    },
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
