import vuetify from './setup'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import AppContent from '@/components/AppContent.vue'
import List from '@/components/List.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', () => {
  
  let wrapper, getters, store
  
  beforeEach(() => {
    
    getters = {
      selectedList: jest.fn(() => 'To Do'),
      incompleteTasks: jest.fn(),
      completedTasks: () => []
    }
    store = new Vuex.Store({ getters })
    
    wrapper = shallowMount(AppContent, {
      store,
      vuetify,
      localVue
    })
    
  })
  
  it('renders the To Do list', () => {
    
    expect(wrapper.findComponent(List).element).toBeVisible()
    expect(wrapper.findComponent(List).props().title).toBe('To Do')
    
  })
  
})
