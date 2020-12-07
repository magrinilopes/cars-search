<template>
  <div class="alertFixed">
    <div class="alert tex-alerts" v-show="show" :class="{'alert-success': success, 'alert-danger': !success}">
      <span style="margin-right: 20px" v-html="textAlert"></span>
      <button type="button" class="close" @click="hideAlert" aria-label="Fechar">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  import { Events } from './Events';

  export default{
    name: 'Alert',
    data(){
      return {
        textAlert: '',
        success: false,
        show: false,
        time: false,
        timerHide: null
      }
    },
    created(){
      Events.$on('ShowAlert', this.showAlert);
      Events.$on('HideAlert', this.hideAlert);
    },
    beforeDestroy(){
      Events.$off('ShowAlert', this.showAlert);
      Events.$off('HideAlert', this.hideAlert);
    },
    methods: {
      showAlert(obj){
        this.textAlert = obj.text;
        this.time = obj.time ? obj.time : 3000;
        this.success = obj.success ? obj.success : false;
        this.show = true;
        this.timerHide = setTimeout(() => {
          this.hideAlert();
        }, this.time)
      },
      hideAlert(){
        if(this.timerHide){
          clearTimeout(this.timerHide);
          this.timerHide = null;
        }
        this.show = false;
        this.textAlert = '';
      }
    }
  }
</script>

<style>
  .alertFixed{
    position: fixed;
    top: .5em;
    right: .5em;
    z-index: 9999;
  }
</style>