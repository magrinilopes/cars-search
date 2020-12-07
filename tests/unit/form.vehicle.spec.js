import { shallowMount, localVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import FormVehicle from '@/components/FormVehicle.vue'

describe('FormVehicle.vue', () => {
  let props;

  const build = () => {
    const mutate = jest.fn(() => Promise.resolve({
      data: {}
    }))
    const wrapper = shallowMount(FormVehicle, {
      propsData: props,
      localVue,
      mocks: {
        $apollo: {
          mutate,
        },
      }
    })
    return {
      wrapper
    }
  }

  beforeEach(() => {
    props = {
      isNew: true,
      formVehicle: {
        modelo: ''
      }
    };
  })

  it('component should call error event on mutation of save vehicle', async () => {
    const mutate = jest.fn(() => Promise.reject('Some error'))
    const wrapper = shallowMount(FormVehicle, {
      propsData: props,
      localVue,
      mocks: {
        $apollo: {
          mutate,
        },
      }
    })
    wrapper.vm.vehicle = {
      modelo: 'Test',
      marca: 'GM',
      ano_modelo: 2020,
    }
    wrapper.vm.saveVehicle()
    expect(mutate).toBeCalled()
    await flushPromises()
    expect(wrapper.emitted('ThrowError')).toBeTruthy()
  })

  it('component should call success event on mutation of save new vehicle', async () => {
    const mutate = jest.fn(() => Promise.resolve({data: {save: '123'}}))
    const wrapper = shallowMount(FormVehicle, {
      propsData: props,
      localVue,
      mocks: {
        $apollo: {
          mutate,
        },
      }
    })
    wrapper.vm.vehicle = {
      modelo: 'Test',
      marca: 'GM',
      ano_modelo: 2020,
    }
    wrapper.vm.saveVehicle()
    await flushPromises()
    expect(wrapper.emitted('SuccessSave')).toBeTruthy()
  })

  it('component should call success event on mutation of edited vehicle', async () => {
    const mutate = jest.fn(() => Promise.resolve({data: {save: '123'}}))
    const wrapper = shallowMount(FormVehicle, {
      propsData: {
        isNew: false,
        formVehicle:{
          modelo: 'Test',
          marca: 'GM',
          ano_modelo: 2020,
        }
      },
      localVue,
      mocks: {
        $apollo: {
          mutate,
        },
      }
    })
    wrapper.vm.vehicle = {
      _id: '123',
      modelo: 'Test Edit',
      marca: 'GM',
      ano_modelo: 2020,
    }
    wrapper.vm.saveVehicle()
    await flushPromises()
    expect(wrapper.emitted('SuccessEdit')).toBeTruthy()
  })

  it('component should update model value of new vehicle', () => {
    const { wrapper } = build()
    wrapper.setProps({formVehicle: {modelo: 'Test Model'}})
    wrapper.vm.updateFormVehicle()
    expect(wrapper.vm.vehicle.modelo).toEqual('Test Model')
  })

  it('component should update model value of edit vehicle', () => {
    const mutate = jest.fn(() => Promise.resolve({data: {save: '123'}}))
    const wrapper = shallowMount(FormVehicle, {
      propsData: {
        isNew: false,
        formVehicle: {
          modelo: 'Test',
          marca: 'GM',
          ano_modelo: 2020,
        }
      },
      localVue,
      mocks: {
        $apollo: {
          mutate,
        },
      }
    })
    wrapper.setProps({
      formVehicle: {
        modelo: 'Test Model',
        marca: 'VOLKSWAGEN',
        ano_modelo: 2018
      }
    })
    wrapper.vm.updateFormVehicle()
    expect(wrapper.vm.vehicle.modelo).toEqual('Test Model')
    expect(wrapper.vm.vehicle.marca).toEqual('VOLKSWAGEN')
    expect(wrapper.vm.vehicle.ano_modelo).toEqual(2018)
  })
})
