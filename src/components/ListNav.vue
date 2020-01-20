<template>
  <v-list nav>
    <v-list-item-group
      v-model="listIndex"
      color="primary"
      mandatory
    >
      <v-list-item
        v-for="list in lists"
        :key="list.id"
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

    <v-list-item @click="enterNewListName = true">
      <v-list-item-icon>
        <v-icon>mdi-plus</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-if="!enterNewListName">
          Add List
        </v-list-item-title>
        <v-text-field
          v-if="enterNewListName"
          v-model="newListName"
          label="enter new list name"
          autofocus
          @blur="blurAddList"
          @keyup.enter="enterNewList"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ListNav',
  data: () => ({
    enterNewListName: false,
    newListName: ''
  }),
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
      'selectList',
      'addList'
    ]),
    blurAddList () {
      this.enterNewListName = false
      this.newListName = ''
    },
    enterNewList () {
      this.addList({ newListName: this.newListName })
      this.blurAddList()
      this.selectList({ listIndex: this.lists.length - 1 })
    }
  }
}
</script>

<style scoped>

</style>
