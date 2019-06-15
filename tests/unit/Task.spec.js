import { shallowMount, createLocalVue } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon)

import Task from '@/components/Task.vue'

describe('Task.vue', () => {
  
  it('renders task.name and task.createdDate when passed', () => {
    
    const task = {
      id: 1, 
      name: 'new task 1', 
      createdDate: new Date(),
      completedDate: null,
      completed: false
    }
    
    const wrapper = shallowMount(Task, {
      propsData: { task: task },
      localVue
    })
    
    expect(wrapper.text()).toMatch(task.name)
    expect(wrapper.text()).toMatch('Created on')
    expect(wrapper.text()).toMatch(moment(task.createdDate).format('ddd MMM DD YYYY,'))
    expect(wrapper.text()).toMatch(moment(task.createdDate).format('h:mm a'))
    
  })
  
})
