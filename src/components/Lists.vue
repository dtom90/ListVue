<template>
  <div class="list-group">
    <a
      v-for="(list, index) in lists"
      :key="index"
      href="#"
      class="list-group-item list-group-item-action active"
    >
      {{ list.name }}
    </a>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Lists',
  computed: {
    ...mapState([
      'lists'
    ])
  }
}
</script>

<style scoped>

</style>
