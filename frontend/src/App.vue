<template>
  <v-app>
    <AppBar @toggleDrawer="drawer = !drawer" />
    
    <v-navigation-drawer
      v-model="drawer"
      :mobile-break-point="$vuetify.breakpoint.thresholds.xs"
      clipped
      app
    >
      <ListNav />
    </v-navigation-drawer>
    
    <AppContent />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import ListNav from './components/ListNav'
import AppContent from './components/AppContent'
import { mapActions } from 'vuex'

export default {
  components: { AppBar, ListNav, AppContent },
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
