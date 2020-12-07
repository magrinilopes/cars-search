<template>
  <article  v-if="getVehicleDetails" class="detail-vehicle" role="region" aria-label="Detalhes do Veículo">
    <h6>Detalhes</h6>
    <div class="row">
      <div class="col-12 mt-4 mb-2">
        <h6 class="purple">{{ getVehicleDetails.modelo }}</h6>
      </div>
      <div class="col-xs-8 col-md-6">
        <label>Marca</label>
        <label class="purple">{{ getVehicleDetails.marca }}</label>
      </div>
      <div class="col-xs-4 col-md-6">
        <label>Ano</label>
        <span class="purple">{{ getVehicleDetails.ano_modelo }}</span>
      </div>
    </div>
    <p>
      {{ getVehicleDetails.descricao }}
    </p>
    <hr>
    <div class="row">
      <div class="col-6">
        <button class="btn btn-tex btn-edit-vehicle" aria-label="Editar veículo" @click="showModalEditVehicle">
          <span class="icon-edit mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="#7d7d7d" viewBox="0 0 60.017 60.017">
              <path d="M59.144 3.731L56.294.88a2.991 2.991 0 0 0-4.221.001l-3.126 3.126H0v56h56v-48.91l.305-.305 2.839-2.839a2.989 2.989 0 0 0 0-4.222zM20.047 36.759l3.22 3.22-4.428 1.208 1.208-4.428zm32.015-24.553L47.82 7.964l1.414-1.414 4.243 4.242-1.415 1.414zm-1.414 1.414L25.192 39.076l-4.242-4.242L46.406 9.378l4.242 4.242zM54 13.097v44.91H2v-52h44.947l-28.118 28.12-.188.188-2.121 7.779-1.226 1.226a.999.999 0 1 0 1.414 1.414l1.226-1.226 7.779-2.123 26.351-26.35.447-.447L54 13.097zm3.73-6.558l-2.839 2.839-4.243-4.243 2.839-2.839a.987.987 0 0 1 1.393 0l2.85 2.85a.986.986 0 0 1 0 1.393z"/>
            </svg>
          </span>
          Editar
        </button>
      </div>
      <div class="col-6 text-right">
        <span class="icon-tag mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" fill="#A8A5E5" viewBox="0 0 24 28">
            <path d="M7 7c0-1.109-.891-2-2-2s-2 .891-2 2 .891 2 2 2 2-.891 2-2zm16.672 9c0 .531-.219 1.047-.578 1.406l-7.672 7.688c-.375.359-.891.578-1.422.578s-1.047-.219-1.406-.578L1.422 13.906C.625 13.125 0 11.609 0 10.5V4c0-1.094.906-2 2-2h6.5c1.109 0 2.625.625 3.422 1.422l11.172 11.156c.359.375.578.891.578 1.422z"/>
          </svg>
        </span>
      </div>
    </div>
    <div class="modal fade modal-edit-vehicle" data-backdrop="static" tabindex="-1" aria-label="Modal Edição de Veículo" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Veículo</h5>
            <button type="button" class="close" @click="closeModalEditVehicle" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <FormVehicle 
              ref="formEditVehicle"
              :is-new="false" 
              :form-vehicle="getVehicleDetails"
              @SuccessEdit="treatSuccessEditVehicle"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-modal blue" aria-label="Gravar alterações" @click="saveEditVehicle">Gravar</button>
            <button type="button" class="btn btn-modal red"  aria-label="Cancelar alterações" @click="closeModalEditVehicle">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions, mapGetters } from 'vuex'
import { Events } from '../components/Events'
import FormVehicle from '../components/FormVehicle'

export default {
  name: 'DetailVehicle',
  components: {
    FormVehicle
  },
  computed: Object.assign(
    mapGetters(['getVehicleDetails']),
    {
      getVariables(){
        return {
          id: this.$route.params.id
        }
      }
    }
  ),
  apollo: {
    details: {
      query: gql`query Veiculo($id: ID!) {
        details(id: $id) {
          _id
          marca
          modelo
          ano_fabricacao
          ano_modelo
          combustivel
          cor
          vendido
          descricao
        }
      }`,
      /* istanbul ignore next */
      variables(){
        return this.getVariables
      },
      /* istanbul ignore next */
      result(result){
        this['updateVehicleDetails'](result.data.details);
      }
    }
  },
  methods: Object.assign(
    mapActions(['updateVehicleDetails']),
    {
      closeModalEditVehicle(){
        window.$('.modal-edit-vehicle').modal('hide');
      },
      showModalEditVehicle(){
        window.$('.modal-edit-vehicle').modal({
          keyboard: false,
          backdrop: 'static',
        });
      },
      saveEditVehicle(){
        this.$refs['formEditVehicle'].saveVehicle();
      },
      treatSuccessEditVehicle(){
        this.closeModalEditVehicle();
        this.$apollo.queries.details.refresh();
        Events.$emit('ShowAlert', {
          success: true,
          text: 'Veículo alterado com sucesso!'
        })
      }
    }
  )
}
</script>

<style lang="scss" scoped>
  .detail-vehicle{
    margin-bottom: 2em;
    label{
      display: block;
      margin: 0;
    }
    hr{
      border-bottom: 1px solid #ccc;
      margin: 2em 0;
    }
    .purple{
      margin-bottom: 1em;
    }
    .purple-light{
      color: #A8A5E5;
    }
    .btn-edit-vehicle{
      background-color: #F7F090;
      color: #757575;
      &:focus{
        border: 2px solid black;
      }
    }
  }
</style>