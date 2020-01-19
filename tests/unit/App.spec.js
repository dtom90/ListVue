import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import App from '@/App.vue'
import TaskList from '@/components/TaskList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('App', () => {
  
  let wrapper, getters, store, vuetify
  
  beforeEach(() => {

    getters = {
      selectedList: jest.fn(),
      incompleteTasks: jest.fn(),
      completedTasks: () => []
    }
    store = new Vuex.Store({ getters })
    vuetify = new Vuetify()
    
    wrapper = shallowMount(App, {
      store,
      vuetify,
      localVue
    })
    
  })
  
  it('renders the To Do list', () => {
    
    expect(wrapper.find(TaskList).isVisible()).toBe(true)
    
  })
  
})
