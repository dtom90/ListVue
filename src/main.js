import Vue from 'vue'

// Vuex store
import store from './store'

// Vuetify
import vuetify from './plugins/vuetify'

// App component
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  store
}).$mount('#app')
