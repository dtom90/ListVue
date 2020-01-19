import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      {
        name: 'To Do',
        tasks: []
      }
    ],
    selected: 0
  },
  getters,
  mutations,
  actions: {
  },
  modules: {
  }
})
