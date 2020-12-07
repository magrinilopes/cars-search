<template>
  <div id="app" class="container p-0">
    <Header />
    <div class="container content">
      <NewVehicle />
      <div class="row">
        <ListVehicle class="col-xs-12 col-md-6" />
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" class="col-xs-12 col-md-6" />
        </transition>
      </div>
    </div>
    <Alerts />
  </div>
</template>

<script>
import Header from './views/Header.vue'
import NewVehicle from './components/NewVehicle'
import Alerts from './components/Alerts'
import ListVehicle from './views/ListVehicle'

export default {
  components:{
    Header,
    Alerts,
    NewVehicle,
    ListVehicle
  }
}
</script>

<style lang="scss">
  #app .content{
    background-color: #F2F2F2;
    color: #6D6D6D;
    .purple{
      color: #7E84B7;
    }
    .loading {
      border: 3px solid #7E84B7;
      border-top: 3px solid #ACCDFB;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
    }
    .modal-content{
      background-color: #F2F2F2;
    }
    .btn-modal{
      border-radius: 0.6em;
      min-width: 9em;
      height: 3em;
      color: #fff;
      &.blue{
        background-color: #93BFFB;
      }
      &.red{
        background-color: #EF6767;
      }
    }
  }
  #app .btn-tex{
    border-radius: .6em;
    box-shadow: 0 3px 3px #ccc;
    font-weight: bold;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  @media only screen and (min-width: 768px) {
    #app .content{
      padding: 0 3em 3em 3em;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
