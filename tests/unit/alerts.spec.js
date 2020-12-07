import { shallowMount } from '@vue/test-utils'
import Alerts from '@/components/Alerts.vue'
import { Events } from '@/components/Events'

describe('Alerts.vue', () => {
  const build = () => {
    const wrapper = shallowMount(Alerts)
    return {
      wrapper
    }
  }

  it('component should be hide', () => {
    const { wrapper } = build()
    expect(wrapper.vm.show).toBeFalsy()
  })

  it('component should be show', () => {
    const { wrapper } = build()
    wrapper.setData({
      show: true,
      textAlert: 'Meu alerta',
      success: false
    })
    expect(wrapper.vm.show).toBeTruthy()
  })

  it('component should have the text "Meu alerta" and "alert-danger" class', () => {
    const { wrapper } = build()
    wrapper.setData({
      show: true,
      textAlert: 'Meu alerta'
    })
    expect(() => wrapper.get('.alert-danger').to.throw().with.property('selector'))
    expect(wrapper.vm.textAlert).toEqual('Meu alerta')
  })

  it('component should receiver the event "ShowAlert"', () => {
    const { wrapper } = build()
    Events.$emit('ShowAlert', {
      success: true,
      text: 'Meu texto',
      time: 2000
    })

    expect(wrapper.vm.show).toBeTruthy()
    expect(() => wrapper.get('.alert-success').to.throw().with.property('selector'))
    expect(wrapper.vm.textAlert).toEqual('Meu texto')
  })

  it('component should restart the variables of exhibition of alert with timer declared', () => {
    const { wrapper } = build()
    Events.$emit('ShowAlert', {
      success: false,
      text: 'Meu texto'
    })

    wrapper.vm.hideAlert();
    expect(wrapper.vm.show).toBeFalsy()
    expect(wrapper.vm.textAlert).toBe('')
    expect(() => wrapper.get('.alert-danger').to.throw().with.property('selector'))
  })

  it('component should restart the variables of exhibition of alert without timer declared', () => {
    const { wrapper } = build()
    wrapper.setData({
      show: true,
      textAlert: 'Meu alerta'
    })
    wrapper.vm.hideAlert()
    expect(wrapper.vm.show).toBeFalsy()
    expect(wrapper.vm.textAlert).toEqual('')
  })


  it('component should call function "hideAlert" after the timer is reset', () => {
    jest.useFakeTimers();
    let mockMethod = jest.fn()

    const { wrapper } = build()
    wrapper.vm.hideAlert = mockMethod
    Events.$emit('ShowAlert', {
      success: false,
      text: 'Meu texto'
    })

    expect(wrapper.vm.timerHide).not.toBe(null)
    jest.runAllTimers();
    expect(mockMethod).toHaveBeenCalled()
  })

  it('tratar se o componente está chamando o beforeDestroy', () => {
    const { wrapper } = build()
    wrapper.destroy()
    expect(wrapper.exists()).toBeFalsy()
  })

})
