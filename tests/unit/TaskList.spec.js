import { shallowMount, createLocalVue } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'
import Task from '@/components/Task.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrashAlt, faSave, faSort, faBars, faCog, faEllipsisH, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
library.add(faTrashAlt, faSave, faSort, faBars, faCog, faEllipsisH, faPencilAlt)

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon)

const tasks = [
  {id: 1, name: 'new task 1'},
  {id: 2, name: 'new task 2'},
  {id: 3, name: 'new task 3'}
]

const titles = [
  ['To Do List', 'h1'],
  ['Completed Tasks', 'h3']
]

describe('TaskList', () => {

  describe.each(titles)('%s', (title, titleTag) => {
    
    // Expect title to default to 'To Do List'
    const titleProps = title === 'To Do List' ? {} : { title }
    
    const wrapper = shallowMount(TaskList, {
      propsData: Object.assign(titleProps, { tasks: tasks }),
      localVue
    });

    it(`should have the title "${title}"`, () => {
      
      expect(wrapper.props().title).toBe(title)
      expect(wrapper.find(titleTag).text()).toBe(title)
      
    })

    it('should have tasks loaded into props', () => {

      expect(wrapper.props().tasks).toBe(tasks)

    })

    it('renders tasks in oldest-first order', () => {

      wrapper.setData({
        sortOrder: 'Oldest'
      })
      expect(wrapper.vm.sortOrder).toBe('Oldest')

      const renderedTasks = wrapper.findAll(Task)
      expect(renderedTasks.length).toBe(tasks.length)
      renderedTasks.wrappers.forEach((renderedTask, i) => {
        expect(renderedTask.props().task.name).toMatch(tasks[i].name)
      })

    })

    it('renders tasks in newest-first order', () => {

      wrapper.setData({
        sortOrder: 'Newest'
      })
      expect(wrapper.vm.sortOrder).toBe('Newest')

      const renderedTasks = wrapper.findAll(Task)
      expect(renderedTasks.length).toBe(tasks.length)
      renderedTasks.wrappers.forEach((renderedTask, i) => {
        expect(renderedTask.props().task.name).toMatch(tasks[tasks.length-1-i].name)
      })

    })
    
  })

})
