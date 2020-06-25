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
      <v-menu
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        
        <v-list>
          <v-subheader>Logged in as:</v-subheader>
          <v-list-item>{{ email }}</v-list-item>
          <v-list-item>
            <v-btn
              color="blue"
              block
              @click="logOut"
            >
              Log Out
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
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
