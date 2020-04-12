import { shallowMount } from '@vue/test-utils'
import moment from 'moment'

import Task from '@/components/Task.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'

describe('Task', () => {
  
  describe('Incomplete', () => {
    
    const task = {
      id: 1,
      name: 'new task 1',
      createdDate: new Date(),
      completedDate: null,
      completed: false
    }
    
    const wrapper = shallowMount(Task, {
      propsData: { task }
    })
    
    it('renders the task name', () => {
      
      expect(wrapper.text()).toMatch(task.name)
      
    })
    
    it('renders the SettingsMenu for incomplete task', () => {
      
      expect(wrapper.find(SettingsMenu).props().dateType).toBe('Created')
      expect(wrapper.find(SettingsMenu).props().date).toBe(task.createdDate)
      
    })
    
  })
  
  describe('Complete', () => {
    
    const task = {
      id: 1,
      name: 'new task 1',
      createdDate: new Date(),
      completedDate: moment(new Date()).add(30, 'm').toDate(),
      completed: true
    }
    
    const wrapper = shallowMount(Task, {
      propsData: { task: task }
    })
    
    it('renders the task name', () => {
      
      expect(wrapper.text()).toMatch(task.name)
      
    })
    
    it('renders the SettingsMenu for incomplete task', () => {
      
      expect(wrapper.find(SettingsMenu).props().dateType).toBe('Completed')
      expect(wrapper.find(SettingsMenu).props().date).toBe(task.completedDate)
      
    })
    
  })
  
})
