import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import TaskList from '@/components/TaskList.vue'
import store from '@/store'

describe('App', () => {

  const wrapper = shallowMount(App, { store })

  it('renders the To Do list', () => {

    expect(wrapper.find(TaskList).isVisible()).toBe(true)
  
  })

})
