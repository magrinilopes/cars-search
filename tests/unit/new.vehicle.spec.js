import { shallowMount, localVue } from '@vue/test-utils'
import NewVehicle from '@/components/NewVehicle.vue'
import FormVehicle from '@/components/FormVehicle.vue'
import { Events } from '@/components/Events'

let mockModal = jest.fn()
global.$ = jest.fn().mockReturnValue({modal: mockModal});

describe('NewVehicle.vue', () => {
  
  const build = () => {
    const wrapper = shallowMount(NewVehicle,{
      localVue,
    })
    return {
      wrapper
    }
  }

  it('component should be component FormVehicle', () => {
    const { wrapper } = build()
    const form = wrapper.findComponent(FormVehicle)
    expect(form.exists()).toBe(true)
  })
  
  it('component should close modal on success save a new vehicle', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.$router = {
      push: jest.fn()
    };
    wrapper.vm.closeModalNewVehicle = mockMethod
    wrapper.vm.treatSuccessSaveVehicle('123')
    expect(mockMethod).toHaveBeenCalled()
  })

  it('component should redirect route success save a new vehicle', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.$router = {
      push: mockMethod
    };
    wrapper.vm.closeModalNewVehicle = jest.fn()
    wrapper.vm.treatSuccessSaveVehicle('123')
    expect(mockMethod).toHaveBeenCalled()
  })
  
  it('component should emit the ShowAlert event to signal the user of success when saving a new vehicle', () => {
    const { wrapper } = build()
    wrapper.vm.$router = {
      push: jest.fn()
    };
    wrapper.vm.closeModalNewVehicle = jest.fn()
    Events.$on('ShowAlert', (data) => {
      wrapper.vm.$emit('ShowAlert', data);
    });

    wrapper.vm.treatSuccessSaveVehicle('123')
    expect(wrapper.emitted('ShowAlert')).toBeTruthy()
  })

  it('component should call method saveVehicle of component FormVehicle', () => {
    let mockMethod = jest.fn()
    const { wrapper } = build()
    wrapper.vm.$refs.formNewVehicle = {
      saveVehicle: mockMethod
    }
    wrapper.vm.addVehicle()
    expect(mockMethod).toHaveBeenCalled()
  })

  it('component should call method to show modal', () => {
    const { wrapper } = build()
    wrapper.vm.showModalNewVehicle()
    expect(mockModal).toHaveBeenCalledWith({
      keyboard: false,
      backdrop: 'static',
    })
  })

  it('component should reset modal', () => {
    const { wrapper } = build()
    wrapper.vm.vehicleName = 'Test Reset'
    wrapper.vm.closeModalNewVehicle()
    expect(wrapper.vm.vehicleName).toEqual('')
    expect(mockModal).toHaveBeenCalledWith('hide')
  })
})
