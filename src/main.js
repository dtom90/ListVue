import Vue from 'vue'
import App from './App.vue'

// Boostrap style
import 'bootstrap/dist/css/bootstrap.css'
// Bootstrap function
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Font Awesome icons
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrashAlt, faSave, faCog, faEllipsisH, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faSave, faCog, faEllipsisH, faPencilAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import store from './store'

new Vue({
  render: h => h(App),
  data: store
}).$mount('#app')
