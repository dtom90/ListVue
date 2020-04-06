import { shallowMount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'

const tasks = [
  { id: 1, name: 'new task 1' },
  { id: 2, name: 'new task 2' },
  { id: 3, name: 'new task 3' }
]

const titles = [
  ['To Do', 'h1'],
  ['Completed', 'h3']
]

describe('TaskList', () => {
  
  describe.each(titles)('%s', (title, titleTag) => {
    
    // Expect title to default to 'To Do List'
    const titleProps = title === 'To Do List' ? {} : { title }
    
    const wrapper = shallowMount(TaskList, {
      propsData: Object.assign(titleProps, { tasks: tasks })
    })
    
    it(`should have the title "${title}"`, () => {
      
      expect(wrapper.props().title).toBe(title)
      expect(wrapper.find(titleTag).text()).toBe(title)
      
    })
    
    it('should have tasks loaded into props', () => {
      
      expect(wrapper.props().tasks).toBe(tasks)
      
    })
    
  })
  
})
