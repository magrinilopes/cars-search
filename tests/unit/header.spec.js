import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Header from '@/views/Header.vue'
import actions from './mocks/actions'
import getters from './mocks/getters'
import VueApollo from "vue-apollo"

let mockModal = jest.fn()
global.$ = jest.fn().mockReturnValue({modal: mockModal})

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueApollo)

describe('Header.vue', () => {
  const build = () => {
    let mockMethod = jest.fn()
    const $route = {
      path: '/',
      params: {}
    }
    const $router = {
      push: mockMethod
    }
    const wrapper = shallowMount(Header,{
      localVue,
      store: new Vuex.Store({
        getters,
        actions
      }),
      mocks: {
        $route,
        $router
      }
    })
    return {
      wrapper
    }
  }

  it('component should render', () => {
    const { wrapper } = build()
    expect(wrapper.exists()).toBeTruthy()
  })

  it('component should call resetSearching method when search is update', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.resetSearching = mockMethod
    wrapper.vm.updateSearch()
    expect(mockMethod).toHaveBeenCalled()
  })

  it('component should call method treatSkip and receiver true', () => {
    const { wrapper } = build()
    wrapper.vm.carSearch = ''
    const value = wrapper.vm.treatSkip()
    expect(value).toBeTruthy
  })

  it('component should call method treatSkip and receiver false', () => {
    const { wrapper } = build()
    wrapper.vm.carSearch = 'GOL'
    const value = wrapper.vm.treatSkip()
    expect(value).toBeFalsy()
  })

  it('component should call updateSearching when treatSkip with value in carSearch', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.updateSearching = mockMethod
    wrapper.vm.carSearch = 'GOL'
    wrapper.vm.treatSkip()
    expect(mockMethod).toHaveBeenCalled()
    expect(mockMethod).toHaveBeenCalledWith(true)
  })

  it('component should call router.push when updateSearch', () => {
    let mockMethod = jest.fn()
    const $route = {
      path: '/test',
      params: {
        id: '123'
      }
    }
    const $router = {
      push: mockMethod
    }
    const wrapper = shallowMount(Header, {
      localVue,
      store: new Vuex.Store({
        getters,
        actions
      }),
      mocks: {
        $route,
        $router
      }
    })
    wrapper.vm.updateSearch()
    expect(mockMethod).toHaveBeenCalled()
    expect(mockMethod).toHaveBeenCalledWith({name: 'home'})
  })

  it('component should not call router.push when updateSearch', () => {
    let mockMethod = jest.fn()
    const $route = {
      path: '/',
      params: {}
    }
    const $router = {
      push: mockMethod
    }
    const wrapper = shallowMount(Header, {
      localVue,
      store: new Vuex.Store({
        getters,
        actions
      }),
      mocks: {
        $route,
        $router
      }
    })
    wrapper.vm.updateSearch()
    expect(mockMethod).not.toHaveBeenCalled()
  })

  it('component should return object to query', () => {
    const { wrapper } = build()
    wrapper.vm.carSearch = 'GOL'
    wrapper.vm.treatSkip()
    expect(wrapper.vm.getVariables).toEqual({
      type: 'VEICULO',
      query: {
        $text: {
          $search: 'GOL'
        }
      }
    })
  })

})