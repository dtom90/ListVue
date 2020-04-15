<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mobile-break-point="$vuetify.breakpoint.thresholds.xs"
      clipped
      app
    >
      <ListNav />
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span>ListVue</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col>
            <div class="list-container">
              <div v-if="selectedList">
                <List
                  :title="selectedList.name"
                  :tasks="incompleteTasks"
                  :created-date="selectedList.created_at"
                />
                <br>
                <br>
                <List
                  v-if="completedTasks.length > 0"
                  title="Completed"
                  :tasks="completedTasks"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ListNav from './components/ListNav'
import List from './components/List'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { ListNav, List },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters([
      'selectedList',
      'incompleteTasks',
      'completedTasks'
    ])
  },
  created () {
    this.loadLists()
  },
  methods: {
    ...mapActions([
      'loadLists'
    ])
  }
}
</script>

<style>
  .list-container {
    max-width: 700px;
    margin: auto;
  }
</style>
