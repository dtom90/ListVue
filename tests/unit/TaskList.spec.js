import { shallowMount, createLocalVue } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon)

import TaskList from '@/components/TaskList.vue'
import moment from "./Task.spec";

describe('TaskList.vue', () => {
  
  it('renders props.name when passed', () => {
    
    const tasks = [
      {id: 1, name: 'new task 1', createdDate: new Date()},
      {id: 2, name: 'new task 2', createdDate: new Date()},
      {id: 3, name: 'new task 3', createdDate: new Date()}
    ]
    
    const wrapper = shallowMount(TaskList, {
      propsData: { tasks: tasks },
      localVue
    })
    
    const renderedTasks = wrapper.findAll('li')
    renderedTasks.wrappers.forEach((elem, i) => {
      expect(elem.text()).toMatch(tasks[i].name)
      expect(elem.text()).toMatch('Created on')
      expect(elem.text()).toMatch(moment(tasks[i].createdDate).format('ddd MMM DD YYYY,'))
      expect(elem.text()).toMatch(moment(tasks[i].createdDate).format('h:mm a'))
    })
    
  })
})