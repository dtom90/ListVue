<template>
  <v-list nav>
    <v-list-item-group
      v-model="listIndex"
      color="primary"
      mandatory
    >
      <draggable
        animation="200"
        handle=".handle"
        @start="startDrag"
        @end="endDrag"
      >
        <v-list-item
          v-for="list in lists"
          :key="list.id"
        >
          <v-list-item-action>
            <v-icon class="handle">
              mdi-menu
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ list.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </draggable>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'ListNav',
  components: {
    draggable
  },
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
  created () {
    this.loadLists()
  },
  methods: {
    ...mapMutations([
      'selectList',
      'addList'
    ]),
    ...mapActions([
      'loadLists'
    ]),
    blurAddList () {
      this.enterNewListName = false
      this.newListName = ''
    },
    enterNewList () {
      this.addList({ newListName: this.newListName })
      this.blurAddList()
      this.selectList({ listIndex: this.lists.length - 1 })
    },
    startDrag () {
      this.$el.closest('html').classList.add('draggable-cursor')
    },
    endDrag () {
      this.$el.closest('html').classList.remove('draggable-cursor')
    }
  }
}
</script>

<style scoped>
  /*noinspection CssInvalidPropertyValue*/
  .handle:hover {
    cursor: move; /* fallback: no `url()` support or images disabled */
    cursor: -webkit-grab; /* Chrome 1-21, Safari 4+ */
    cursor:    -moz-grab; /* Firefox 1.5-26 */
    cursor:         grab; /* W3C standards syntax, should come least */
  }
  
  /*noinspection CssInvalidPropertyValue*/
  .draggable-cursor * {
    cursor: move !important; /* fallback: no `url()` support or images disabled */
    cursor: -webkit-grabbing !important; /* Chrome 1-21, Safari 4+ */
    cursor:    -moz-grabbing !important; /* Firefox 1.5-26 */
    cursor:         grabbing !important; /* W3C standards syntax, should come least */
  }
</style>
