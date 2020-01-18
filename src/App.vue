<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <ListNav />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">ListTrack</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <TaskList
            title="To Do List"
            :tasks="incompleteTasks"
          />
          <br>
          <br>
          <TaskList
            v-if="completedTasks.length > 0"
            title="Completed Tasks"
            :tasks="completedTasks"
          />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ListNav from './components/ListNav'
import TaskList from './components/TaskList'
import { mapGetters } from 'vuex'

export default {
  components: { ListNav, TaskList },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters([
      'incompleteTasks',
      'completedTasks'
    ])
  }
}
</script>
