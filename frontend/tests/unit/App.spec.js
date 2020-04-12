import vuetify from './setup'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import App from '@/App.vue'
import ListNav from '@/components/ListNav.vue'
import List from '@/components/List.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', () => {
  
  let wrapper, getters, actions, store
  
  beforeEach(() => {
    
    getters = {
      selectedList: jest.fn(() => 'To Do'),
      incompleteTasks: jest.fn(),
      completedTasks: () => []
    }
    actions = {
      loadLists: jest.fn()
    }
    store = new Vuex.Store({ getters, actions })
    
    wrapper = shallowMount(App, {
      store,
      vuetify,
      localVue
    })
    
  })
  
  it('renders the List Navigation', () => {
    
    expect(wrapper.find(ListNav).isVisible()).toBe(true)
    
  })
  
  it('renders the To Do list', () => {
    
    expect(wrapper.find(List).isVisible()).toBe(true)
    expect(wrapper.find(List).props().title).toBe('To Do')
    
  })
  
})
