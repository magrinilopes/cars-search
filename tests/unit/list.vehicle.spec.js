import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ListVehicle from '@/views/ListVehicle.vue'
import getters from './mocks/getters'

let mockModal = jest.fn()
global.$ = jest.fn().mockReturnValue({modal: mockModal});

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ListVehicle.vue', () => {
  const build = () => {
    const wrapper = shallowMount(ListVehicle,{
      localVue,
      store: new Vuex.Store({
        getters
      })
    })
    return {
      wrapper
    }
  }

  it('component should render', () => {
    const { wrapper } = build()
    expect(wrapper.exists()).toBeTruthy()
  })

  it('component should set value of vehicleSelected with param', () => {
    const { wrapper } = build()
    wrapper.vm.$router = {
      push: jest.fn()
    };
    wrapper.vm.toDetail({_id: '123'})
    expect(wrapper.vm.vehicleSelected).toEqual({_id: '123'})
  })

  it('component should call change router to detailvehicle', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.$router = {
      push: mockMethod
    };
    wrapper.vm.toDetail({_id: '123'})
    expect(mockMethod).toHaveBeenCalledWith({name: 'detailvehicle', params: {id: '123'}})
  })

  it('component should return concat text', () => {
    const { wrapper } = build()
    const text = wrapper.vm.getAcessibilityLinkDetail({marca: 'FIAT', modelo: 'PALIO', ano_modelo: 2010})
    expect(text).toEqual(`Link para detalhes do veículo: Marca FIAT | Modelo PALIO | Ano 2010`)
  })

})