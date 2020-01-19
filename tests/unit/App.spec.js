import vuetify from './setup'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import App from '@/App.vue'
import TaskList from '@/components/TaskList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', () => {
  
  let wrapper, getters, store
  
  beforeEach(() => {
    
    getters = {
      selectedList: jest.fn(),
      incompleteTasks: jest.fn(),
      completedTasks: () => []
    }
    store = new Vuex.Store({ getters })
    
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
