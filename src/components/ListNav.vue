<template>
  <v-list nav>
    <v-list-item-group
      v-model="selectedList"
      link
    >
      <v-list-item
        v-for="list in lists"
        :key="list"
      >
        <v-list-item-action>
          <v-icon />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ list.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ListNav',
  computed: {
    ...mapState([
      'lists',
      'selectedList'
    ])
  }
}
</script>

<style scoped>

</style>
