import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DetailVehicle from '@/views/DetailVehicle.vue'
import actions from './mocks/actions'
import getters from './mocks/getters'
import { Events } from "@/components/Events"

let mockModal = jest.fn()
global.$ = jest.fn().mockReturnValue({modal: mockModal})

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DetailVehicle.vue', () => {

  const build = () => {
    const mockMethod = jest.fn()
    const query = jest.fn().mockResolvedValue({ data: { } });
    const wrapper = shallowMount(DetailVehicle,{
      localVue,
      store: new Vuex.Store({
        getters,
        actions
      }),
      mocks: {
        $apollo:{
          query,
          provider: {
            defaultClient: jest.fn(),
          },
          queries: {
            details: {
              refresh: mockMethod
            }
          }
        }
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

  it('component should return object to query', () => {
    const $route = {
      path: '/test',
      params: {
        id: '123'
      }
    }
    const wrapper = shallowMount(DetailVehicle, {
      localVue,
      store: new Vuex.Store({
        getters,
        actions
      }),
      mocks: {
        $route
      }
    })
    expect(wrapper.vm.getVariables).toEqual({
      id: '123'
    })
  })

  it('component should emit the ShowAlert event when edit vehicle', () => {
    const { wrapper } = build()
    wrapper.vm.$router = {
      push: jest.fn()
    };
    wrapper.vm.closeModalNewVehicle = jest.fn()
    Events.$on('ShowAlert', (data) => {
      wrapper.vm.$emit('ShowAlert', data);
    });

    wrapper.vm.treatSuccessEditVehicle()
    expect(wrapper.emitted('ShowAlert')).toBeTruthy()
  })

  it('component should call query refresh when edit vehicle', () => {
    let mockMethod = jest.fn()
    const query = jest.fn().mockResolvedValue({ data: { } });
    const wrapper = shallowMount(DetailVehicle, {
      localVue,
      store: new Vuex.Store({
        getters,
        actions
      }),
      mocks: {
        $apollo: {
          query,
          provider: {
            defaultClient: jest.fn(),
          },
          queries: {
            details: {
              refresh: mockMethod
            }
          }
        }
      }
    })
    wrapper.vm.$router = {
      push: jest.fn()
    };
    wrapper.vm.closeModalNewVehicle = jest.fn()
    wrapper.vm.treatSuccessEditVehicle()
    expect(mockMethod).toHaveBeenCalled()
  })

  it('component should call method saveVehicle of component FormVehicle', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.$refs.formEditVehicle = {
      saveVehicle: mockMethod
    }
    wrapper.vm.saveEditVehicle()
    expect(mockMethod).toHaveBeenCalled()
  })

  it('component should call method to show modal', () => {
    const { wrapper } = build()
    wrapper.vm.showModalEditVehicle()
    expect(mockModal).toHaveBeenCalledWith({
      keyboard: false,
      backdrop: 'static',
    })
  })

})