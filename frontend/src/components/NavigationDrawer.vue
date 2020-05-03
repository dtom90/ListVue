<template>
  <v-navigation-drawer
    v-model="drawer"
    :mobile-break-point="$vuetify.breakpoint.thresholds.xs"
    clipped
    app
  >
    <ListNav />
  </v-navigation-drawer>
</template>

<script>
import ListNav from './ListNav'

export default {
  name: 'NavigationDrawer',
  components: { ListNav },
  props: {
    navDrawer: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    drawer: {
      get () {
        return this.navDrawer
      },
      set (newDrawer) {
        this.$emit('setDrawer', newDrawer)
      }
    }
  }
}
</script>

<style scoped>

</style>
