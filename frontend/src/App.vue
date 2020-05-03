<template>
  <v-app>
    <AppBar @toggleDrawer="drawer = !drawer" />
    
    <NavigationDrawer
      :nav-drawer="drawer"
      @setDrawer="drawer = $event"
    />
    
    <AppContent />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import NavigationDrawer from './components/NavigationDrawer'
import AppContent from './components/AppContent'
import { mapActions } from 'vuex'

export default {
  components: { AppBar, NavigationDrawer, AppContent },
  data: () => ({
    drawer: null
  }),
  created () {
    this.checkSignIn()
  },
  methods: {
    ...mapActions([
      'checkSignIn'
    ]),
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
