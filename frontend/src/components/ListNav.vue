<template>
  <v-navigation-drawer
    ref="navigationDrawer"
    v-model="drawer"
    :mobile-break-point="$vuetify.breakpoint.thresholds.xs"
    clipped
    app
  >
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
            @click="clickList"
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
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  
  name: 'ListNav',
  
  components: {
    draggable
  },
  
  props: {
    appDrawer: {
      type: Boolean,
      default: null
    },
    setDrawer: {
      type: Function,
      default: () => {}
    }
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
    drawer: {
      get () {
        return this.appDrawer
      },
      set (newValue) {
        this.setDrawer(newValue)
      }
    },
    listIndex: {
      get () {
        return this.selected
      },
      set (index) {
        if (index != null) {
          this.selectList({ index })
        }
      }
    }
  },
  
  methods: {
    ...mapActions([
      'createList',
      'selectList'
    ]),
    clickList () {
      if (this.$refs.navigationDrawer.isMobile) {
        this.setDrawer(false)
      }
    },
    enterNewList () {
      this.createList({ newListName: this.newListName })
      this.blurAddList()
    },
    blurAddList () {
      this.enterNewListName = false
      this.newListName = ''
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
  cursor: -moz-grab; /* Firefox 1.5-26 */
  cursor: grab; /* W3C standards syntax, should come least */
}

/*noinspection CssInvalidPropertyValue*/
.draggable-cursor * {
  cursor: move !important; /* fallback: no `url()` support or images disabled */
  cursor: -webkit-grabbing !important; /* Chrome 1-21, Safari 4+ */
  cursor: -moz-grabbing !important; /* Firefox 1.5-26 */
  cursor: grabbing !important; /* W3C standards syntax, should come least */
}
</style>
