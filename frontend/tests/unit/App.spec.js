import vuetify from './setup'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import App from '@/App.vue'
import ListNav from '@/components/ListNav.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', () => {
  
  let wrapper, actions, store
  
  beforeEach(() => {
    
    actions = {
      checkSignIn: jest.fn()
    }
    store = new Vuex.Store({ actions })
    
    wrapper = shallowMount(App, {
      store,
      vuetify,
      localVue
    })
    
  })
  
  it('renders the List Navigation', () => {
    
    expect(wrapper.findComponent(ListNav).element).toBeVisible()
    
  })
  
  it('calls checkSignIn when created', () => {
    
    expect(actions.checkSignIn.toHaveBeenCalled)
    
  })
  
})
