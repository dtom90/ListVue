import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v1'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      {
        id: uuid(),
        name: 'To Do',
        tasks: [],
        completed: []
      }
    ],
    selected: 0
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})
