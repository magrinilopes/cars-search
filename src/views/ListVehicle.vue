<template>
  <section>
    <div class="mt-2 mb-5" v-if="!getSearchedListVehicles">
      <p class="purple" v-if="!getIsSearching">Pesquise o veículo desejado.</p>
      <div v-else class="loading" aria-label="Carregando veículos"></div>
    </div>
    <p v-else-if="getSearchedListVehicles && getListVehicles.length === 0" class="mt-2 mb-5 purple">
      Nenhum veículo encontrado.
    </p>
    <div v-else>
      <h6>Lista de veículos</h6>
      <nav>
        <ul class="list-vehicles mb-4 nav flex-column" role="navigation">
          <router-link 
            :to="{ name: 'detailvehicle', params: { id: vehicle._id }}" 
            tag="a" class="nav-item card-vehicle" 
            active-class="selected"
            :aria-label="getAcessibilityLinkDetail(vehicle)"
            v-for="(vehicle, idx) in getListVehicles" :key="idx">
              <div class="row">
                <div class="col-10 pr-0">
                  <span class="brand-vehicle">{{ vehicle.marca }}</span>
                  <span class="purple">{{ vehicle.modelo }}</span>
                  <span class="vehicle-year">{{ vehicle.ano_modelo }}</span>
                </div>
                <div class="col-2 text-center">
                  <span class="card-vehicle-tag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="70" fill="#ccc" viewBox="0 0 24 28">
                      <path d="M7 7c0-1.109-.891-2-2-2s-2 .891-2 2 .891 2 2 2 2-.891 2-2zm16.672 9c0 .531-.219 1.047-.578 1.406l-7.672 7.688c-.375.359-.891.578-1.422.578s-1.047-.219-1.406-.578L1.422 13.906C.625 13.125 0 11.609 0 10.5V4c0-1.094.906-2 2-2h6.5c1.109 0 2.625.625 3.422 1.422l11.172 11.156c.359.375.578.891.578 1.422z"/>
                    </svg>
                  </span>
                </div>
              </div>
          </router-link>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListVehicle',
  data(){
    return {
      vehicleSelected: {}
    }
  },
  computed: mapGetters([
    'getListVehicles', 'getSearchedListVehicles', 'getIsSearching'
  ]),
  methods: {
    getAcessibilityLinkDetail(vehicle){
      return `Link para detalhes do veículo: Marca ${vehicle.marca} | Modelo ${vehicle.modelo} | Ano ${vehicle.ano_modelo}`
    },
    toDetail(vehicle){
      this.vehicleSelected = vehicle;
      this.$router.push({name: 'detailvehicle', params: {id: vehicle._id}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-vehicles{
    padding: 0;
    .card-vehicle{
      margin: .7em 0;
      list-style: none;
      padding: 1em;
      border-radius: .7em;
      height: 100px;
      box-shadow: 0 3px 3px #ccc;
      color: #6D6D6D;
      background-image: linear-gradient(45deg, #fff, #fff);
      &:hover{
        text-decoration: none;
      }
      .brand-vehicle{
        color: #444;
      }
      &.selected{
        color: #fff;
        background-image: linear-gradient(45deg, #A8A5E5, #94BCFA);
        transition: all 0.5s ease-out;
        .purple, .brand-vehicle{
          color: #fff !important;
        }
        .vehicle-year{
          color: #6d6d6d;
        }
        .card-vehicle-tag svg{
          fill: #fff;
        }
      }
      span{
        display: block;
      }
    }
  }

</style>