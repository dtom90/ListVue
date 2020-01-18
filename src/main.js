import Vue from 'vue'

// Boostrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Vuex store
import store from './store'

// App component
import App from './App.vue'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  store
}).$mount('#app')
