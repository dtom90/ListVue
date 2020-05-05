<template>
  <v-content>
    <v-container fluid>
      <v-row justify="center">
        <v-col>
          <div class="list-container">
            <div v-if="selectedList">
              <List
                :title="selectedList.name"
                :tasks="incompleteTasks"
                :created-date="selectedList.created_at"
              />
              <br>
              <br>
              <List
                v-if="completedTasks.length > 0"
                title="Completed"
                :tasks="completedTasks"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import List from './List'
import { mapGetters } from 'vuex'

export default {
  name: 'AppContent',
  components: { List },
  computed: {
    ...mapGetters([
      'selectedList',
      'incompleteTasks',
      'completedTasks'
    ])
  }
}
</script>

<style scoped>
.list-container {
  max-width: 700px;
  margin: auto;
}
</style>
