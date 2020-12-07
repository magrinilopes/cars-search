<template>
  <form class="row form-vehicle">
    <div class="col-xs-12 col-md-6 form-group">
      <div class="form-field">
        <div class="form-field__control">
          <input :id="`modelo_${nameFields}`" type="text" class="form-field__input" aria-label="Modelo do veículo" v-model="vehicle.modelo" placeholder=" " />
          <label :for="`modelo_${nameFields}`" class="form-field__label" aria-hidden="true">Veículo</label>
          <div class="form-field__bar"></div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6 form-group">
      <div class="form-field">
        <div class="form-field__control">
          <select :id="`marca_${nameFields}`" class="form-field__select" aria-label="| Marca do veículo" v-model="vehicle.marca" >
            <option value="" selected>Selecione...</option>
            <option v-for="(brand, idx) in brands" :key="idx">{{ brand }}</option>
          </select>
          <label :for="`marca_${nameFields}`" class="form-field__label" aria-hidden="true">Marca</label>
          <div class="form-field__bar"></div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6 form-group">
      <div class="form-field">
        <div class="form-field__control">
          <input :id="`ano_${nameFields}`" type="number" class="form-field__input" aria-label="| Ano do veículo" v-model.number="vehicle.ano_modelo" placeholder=" " />
          <label :for="`ano_${nameFields}`" class="form-field__label" aria-hidden="true">Ano</label>
          <div class="form-field__bar"></div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-6 form-group">
      <div class="custom-control custom-switch mt-md-4">
        <input type="checkbox" class="custom-control-input" aria-label="| Veículo vendido:" :id="getIdSolded" v-model="vehicle.vendido">
        <label class="custom-control-label" :for="getIdSolded" aria-hidden="true">Vendido</label>
      </div>
    </div>
    <div class="col-12 form-group">
      <div class="form-field">
        <div class="form-field__control">
          <textarea :id="`descricao_${nameFields}`" class="form-field__textarea" placeholder=" " v-model="vehicle.descricao"></textarea>
          <label :for="`descricao_${nameFields}`" class="form-field__label">Descrição</label>
          <div class="form-field__bar"></div> 
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'FormVehicle',
  props:{
    isNew:{
      type: Boolean,
      default: true,
    },
    formVehicle:{
      type: Object
    }
  },
  data(){
    return {
      nameFields: '',
      brands: [
        'FIAT', 'GM', 'CHEVROLET', 'VOLKSWAGEN', 'FORD', 'RENAULT', 'HYUNDAI',
        'TOYOTA', 'HONDA', 'NISSAN', 'CITROEN', 'MITSUBISHI', 'PEUGEOT', 'SUZUKI',
      ],
      vehicle: {}
    }
  },
  computed: {
    getIdSolded(){
      return this.isNew ? 's_solded_new' : 's_solded_edit'
    }
  },
  created(){
    this.nameFields = this.isNew ? 'novo' : 'edicao';
    if(this.isNew){
      this.vehicle =  {
        marca: '',
        modelo: this.formVehicle.modelo,
        cor: 'Não Informado',
        ano_fabricacao: 2020,
        combustivel: 'FLEX',
        vendido: false
      }
    }
    else{
      this.vehicle = this.formVehicle;
    }
  },
  watch: {
    formVehicle: 'updateFormVehicle'
  },
  methods: {
    updateFormVehicle(){
      if(this.isNew){
        this.vehicle.modelo = this.formVehicle.modelo;
      }
      else{
        this.vehicle = {...this.formVehicle};
      }
    },
    saveVehicle(){
      const successEvent = this.isNew ? 'SuccessSave' : 'SuccessEdit'
      let variables = {
        data: this.vehicle
      }
      if(!this.isNew){
        let dataEdit = {...this.vehicle};
        delete dataEdit._id;
        delete dataEdit.__typename;
        variables = {
          data: dataEdit,
          id: this.vehicle._id
        }
      }
      this.$apollo.mutate({
        mutation: gql`mutation ($data: VeiculoInput!, $id: ID) {
          save(data: $data, id: $id)
        }`,
        variables: variables
      }).then((data) => {
        this.$emit(successEvent, data.data.save);
      }).catch((error) => {
        this.$emit('ThrowError', error);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $primary-color: #93BFFB;
  $animation-duration: 0.4s;

  @mixin label-inactive() {
    font-size: 1.2rem;
    transform: translateY(0) translateX(0);
  }

  @mixin label-active() {
    font-size: 0.9rem;
    transform: translateY(-20px) translateX(-10px);
  }

  .form-field {
    display: block;
    margin-bottom: 16px;
  }
  .form-field__label {
    @include label-active();
    display: block;
    font-weight: normal;
    left: 0;
    margin: 0;
    padding: 18px 12px 0;
    position: absolute;
    top: 0;
    transition: all $animation-duration;
    width: 100%;
  }
  .form-field__control {
    background: #F2F2F2;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .form-field__bar {
    border-bottom: 2px solid $primary-color;
    bottom: 0;
    content: "";
    display: block;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    transform: scaleX(0);
    transition: all $animation-duration;
    width: 1%;
  }
  .form-field__input,
  .form-field__select,
  .form-field__textarea {
    appearance: none;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #ccc;
    color: #6d6d6d;
    display: block;
    font-size: 1.2rem;
    margin-top: 24px;
    outline: 0;
    padding: 0 12px 10px 12px;
    width: 100%;
    resize: none;
    
    // IE 10-11
    &:-ms-input-placeholder {
      ~ .form-field__label {
        @include label-inactive();
      }
    }
    // All other browsers except Edge
    &:placeholder-shown {
      ~ .form-field__label {
        @include label-inactive();
      }
    }
    &:focus {
      ~ .form-field__label {
        color: #93BFFB;
        @include label-active();
      }
      ~ .form-field__bar {
        border-bottom: 2px solid $primary-color;
        transform: scaleX(150);
      }
    }
  }
  .form-field__textarea {
    height: 100px;
  }

  .form-vehicle .custom-control-label::before, 
  .form-vehicle .custom-control-input:checked~.custom-control-label::before {
    color: #B6E8A5;
    border-color: #E7E7E7;
    background-color: #E7E7E7;
  }

  .form-vehicle .custom-switch .custom-control-label::after{
    background-color: #B6E8A5;
  }
  .form-vehicle .custom-switch .custom-control-input:checked~.custom-control-label::after {
    background-color: #B6E8A5;
    transform: translateX(.75rem);
  }

</style>