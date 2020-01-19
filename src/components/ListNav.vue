<template>
  <v-list nav>
    <v-list-item-group
      v-model="listIndex"
      color="primary"
      mandatory
    >
      <v-list-item
        v-for="list in lists"
        :key="list.name"
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
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ListNav',
  computed: {
    ...mapState([
      'lists',
      'selected'
    ]),
    listIndex: {
      get () {
        return this.selected
      },
      set (listIndex) {
        this.selectList({ listIndex })
      }
    }
  },
  methods: {
    ...mapMutations([
      'selectList'
    ])
  }
}
</script>

<style scoped>

</style>
