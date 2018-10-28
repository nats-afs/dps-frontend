import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import 'vuetify/dist/vuetify.css'
import router from "./router";
import store from './store'

import {
  sync
} from 'vuex-router-sync'

const unsync = sync(store, router) // done. Returns an unsync callback fn

Vue.use(Vuetify, {
  theme: {
    primary: '#fff', //color de enlaces botones
    secondary: '#f00',
    accent: "#1565C0"
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})