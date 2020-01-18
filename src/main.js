import Vue from 'vue'

// Vuex store
import store from './store'

// Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faSave, faSort, faBars, faCog, faEllipsisH, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// App component
import App from './App.vue'

import vuetify from './plugins/vuetify'

library.add(faTrashAlt, faSave, faSort, faBars, faCog, faEllipsisH, faPencilAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  store
}).$mount('#app')
