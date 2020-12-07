<template>
  <section>
    <form class="form-new-vehicle">
      <input type="text" v-model="vehicleName" 
        @keypress.prevent.enter="showModalNewVehicle" 
        placeholder="Adicione um veículo..." 
        aria-label="Insira o nome do novo veículo" 
        class="form-control">
      <button type="button" aria-label="Adicionar veículo" class="btn-add-vehicle" @click.prevent="showModalNewVehicle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="#E7AB69">
          <path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </button>
    </form>
    <div class="modal fade modal-new-vehicle" data-backdrop="static" tabindex="-1" aria-labelledby="Modal Novo Veículo" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Novo Veículo</h5>
            <button type="button" class="close" @click="closeModalNewVehicle" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <FormVehicle ref="formNewVehicle" 
              :is-new="true" 
              :form-vehicle="getFormVehicle"
              @SuccessSave="treatSuccessSaveVehicle" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-modal blue" aria-label="Adicionar veículo" @click="addVehicle">Adicionar</button>
            <button type="button" class="btn btn-modal red"  aria-label="Cancelar adição do veículo" @click="closeModalNewVehicle">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormVehicle from './FormVehicle'
import { Events } from './Events'

export default {
  name: 'NewVehicle',
  components: {
    FormVehicle
  },
  data(){
    return {
      vehicleName: '',
    }
  },
  computed: {
    getFormVehicle(){
      return { modelo: this.vehicleName };
    }
  },
  methods: {
    closeModalNewVehicle(){
      this.vehicleName = '';
      window.$('.modal-new-vehicle').modal('hide');
    },
    showModalNewVehicle(){
      window.$('.modal-new-vehicle').modal({
        keyboard: false,
        backdrop: 'static',
      });
    },
    addVehicle(){
      this.$refs['formNewVehicle'].saveVehicle();
    },
    treatSuccessSaveVehicle(newId){
      this.closeModalNewVehicle();
      Events.$emit('ShowAlert', {
        success: true,
        text: 'Veículo adicionado com sucesso!'
      })
      this.$router.push({name: 'detailvehicle', params: {id: newId}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-new-vehicle{
    padding: 2em 0;
    position: relative;
    input{
      display: inline-block;
      width: 100%;
      vertical-align: middle;
      border: none;
      color: #B9BAB8;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #B9BAB8;
      background: transparent;
      height: 50px;
      padding-right: 50px;
      font-size: 1.2em;
      outline: none;
      &::placeholder{
        color: #B9BAB8;
      }
      &::-ms-input-placeholder{
        color: #B9BAB8;
      }
      &:-ms-input-placeholder{
        color: #B9BAB8;
      }
      &:focus{
        outline: none;
        border-bottom: 2px solid #fff;
      }
    }
    .btn-add-vehicle{
      border: none;
      position: absolute;
      top: 40px;
      right: 16px;
    }
  }
</style>