<template>
  <v-app-bar
    clipped-left
    app
    color="blue darken-3"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')" />
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <span>ListVue</span>
    </v-toolbar-title>
    <v-spacer />
    <div v-if="!email">
      <LoginDialog />
    </div>
    <div v-if="email">
      <span>Logged in as {{ email }} </span>
      <v-btn
        color="blue"
        @click="logOut"
      >
        Log Out
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import LoginDialog from './LoginDialog'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppBar',
  components: { LoginDialog },
  props: {
    toggleDrawer: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...mapState([
      'email'
    ])
  },
  methods: {
    ...mapActions([
      'logOut'
    ])
  }
}
</script>

<style scoped>

</style>
