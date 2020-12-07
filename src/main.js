import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"
window.$ = window.jQuery = require('jquery')

require("popper.js")
require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap")

const apolloClient = new ApolloClient({
  uri: "https://service.teleport.com.br/teste-veiculo/v1/gql",
  fetchOptions: {
    mode: 'cors',
  },
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
