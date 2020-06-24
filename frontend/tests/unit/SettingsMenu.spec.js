import { createLocalVue, shallowMount } from '@vue/test-utils'
import moment from 'moment'
import Vuex from 'vuex'

import SettingsMenu from '@/components/SettingsMenu.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({ state: { lists: [] } })

describe('SettingsMenu', () => {
  
  describe('Incomplete', () => {
    
    const createdDate = new Date()
    const menu = {
      dateType: 'Created',
      date: createdDate.toISOString()
    }
    
    const wrapper = shallowMount(SettingsMenu, {
      propsData: menu,
      store,
      localVue
    })
    
    it('renders the created date', () => {
      
      expect(wrapper.text()).toMatch('Created on')
      expect(wrapper.text()).toMatch(moment(createdDate).format('ddd MMM DD YYYY,'))
      expect(wrapper.text()).toMatch(moment(createdDate).format('h:mm a'))
      
    })
    
    it('does not render "Created On"', () => {
      
      expect(wrapper.text()).not.toMatch('Completed on')
      
    })
    
  })
  
  describe('Complete', () => {
    
    const completedDate = new Date()
    const menu = {
      dateType: 'Completed',
      date: completedDate.toISOString()
    }
    
    const wrapper = shallowMount(SettingsMenu, {
      propsData: menu,
      store,
      localVue
    })
    
    it('renders the completed date', () => {
      
      expect(wrapper.text()).toMatch('Completed on')
      expect(wrapper.text()).toMatch(moment(completedDate).format('ddd MMM DD YYYY,'))
      expect(wrapper.text()).toMatch(moment(completedDate).format('h:mm a'))
      
    })
    
    it('does not render the created date', () => {
      
      expect(wrapper.text()).not.toMatch('Created on')
      
    })
    
  })
  
})
