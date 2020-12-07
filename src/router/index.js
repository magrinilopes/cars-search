import Vue from 'vue'
import VueRouter from 'vue-router'
import DetailVehicle from '../views/DetailVehicle'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/:id',
    name: 'detailvehicle',
    component: DetailVehicle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
