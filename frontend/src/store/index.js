import Vue from 'vue'
import Vuex from 'vuex'

import initialState from './initialState'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: Object.assign({}, initialState),
  getters,
  mutations,
  actions,
  modules: {
  }
})
