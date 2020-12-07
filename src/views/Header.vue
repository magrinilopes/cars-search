<template>
  <header class="navbar p-0 header-main">
    <a class="navbar-brand pl-5" href="https://www.textecnologia.com.br" target="_blank" rel=”noopener” >
      <img class="logo" alt="TEx Tecnologia" height="46" src="../assets/logo.svg">
    </a>
    <form @submit.prevent="" class="ml-auto form-inline form-search">
      <input class="form-control value-search" type="search" 
            placeholder="Pesquise um veículo..." 
            aria-label="Campo de busca"
            v-model="carSearch"
            @keypress="updateSearch"
            @keydown.enter.prevent="">
      <span class="icon-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 52.966 52.966" fill="#fff">
          <path d="M51.704 51.273L36.845 35.82c3.79-3.801 6.138-9.041 6.138-14.82 0-11.58-9.42-21-21-21s-21 9.42-21 21 9.42 21 21 21c5.083 0 9.748-1.817 13.384-4.832l14.895 15.491a.998.998 0 0 0 1.414.028 1 1 0 0 0 .028-1.414zM21.983 40c-10.477 0-19-8.523-19-19s8.523-19 19-19 19 8.523 19 19-8.524 19-19 19z"/>
        </svg>
      </span>
    </form>
  </header>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  data(){
    return {
      carSearch: '',
      pageInfo: {},
      total: 0,
      edges: {},
    }
  },
  apollo: {
    $query: {
      loadingKey: 'loading',
    },
    search: {
      query: gql`query Busca($previous: String, $next: String, $query: JSON, $limit: Int, $type: ResultType!) {
        search(previous: $previous, next: $next, query: $query, limit: $limit, type: $type) {
          results {
            ... on Veiculo {
              _id
              marca
              modelo
              ano_modelo
              descricao
            }
          }
          hasNext
          next
          hasPrevious
          previous
        }
      }`,
      debounce: 1000,
      /* istanbul ignore next */
      variables(){
        return this.getVariables
      },
      /* istanbul ignore next */
      result(result){
        this['updateListVehicles'](result.data.search.results)
      },
      /* istanbul ignore next */
      skip(){
        return this.treatSkip()
      },
    }
  },
  computed: {
    getVariables(){
      return {
        type: 'VEICULO',
        query: {
          $text: {
            $search: this.carSearch
          }
        }
      }
    }
  },
  methods: Object.assign(
    mapActions([
      'updateListVehicles', 'updateSearching', 'resetSearching'
    ]),
    {
      treatSkip(){
        if(this.carSearch !== ''){
          this['updateSearching'](true);
          return false
        }
        return true
      },
      updateSearch(){
        this['resetSearching']([])
        if(this.$route.params.id){
          this.$router.push({name: 'home'})
        }
      }
    }
  )
}
</script>

<style lang="scss" scoped>
.header-main .form-search{
  background-color: #ACCDFB;
  width: 100%;
  position: relative;
  &::after{
    clear: right;
  }
  .icon-search{
    border: none;
    position: absolute;
    top: 1em;
    left: 1em;
  }
  .value-search{
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    color: #fff;
    border: none;
    border-radius: 0;
    background: transparent;
    height: 3em;
    padding-left: 3em;
    font-size: 1.2em;
    &::placeholder{
      color: #fff;
    }
    &::-ms-input-placeholder{
      color: #fff;
    }
    &:-ms-input-placeholder{
      color: #fff;
    }
    &:focus{
      outline: none;
      border-bottom: 2px solid #fff;
    }
  }
}

@media only screen and (min-width: 768px) {
  .form-search{
    width: 50% !important;
  }
}
</style>