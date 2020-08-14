import { shallowMount } from '@vue/test-utils'

import Task from '@/components/Task.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'

describe('Task', () => {

  const task = {
    id: 1,
    name: 'new task 1',
    created_at: (new Date()).toISOString(),
    updated_at: null,
    completed_at: null
  }
  
  describe('Incomplete', () => {
    
    const wrapper = shallowMount(Task, {
      propsData: { task }
    })
    
    it('renders the task name', () => {
      
      expect(wrapper.text()).toMatch(task.name)
      
    })
    
    it('renders the SettingsMenu', () => {
      
      expect(wrapper.findComponent(SettingsMenu).props().dateType).toBe('Created')
      expect(wrapper.findComponent(SettingsMenu).props().date).toBe(task.created_at)
      
    })
    
  })
  
  describe('Complete', () => {
    
    const completedDate = new Date()
    completedDate.setDate(completedDate.getDate() + 1)
    
    task.completed_at = completedDate.toISOString()
    
    const wrapper = shallowMount(Task, {
      propsData: { task: task }
    })
    
    it('renders the task name', () => {
      
      expect(wrapper.text()).toMatch(task.name)
      
    })
    
    it('renders the SettingsMenu', () => {
      
      expect(wrapper.findComponent(SettingsMenu).props().dateType).toBe('Completed')
      expect(wrapper.findComponent(SettingsMenu).props().date).toBe(completedDate.toISOString())
      
    })
    
  })
  
})
