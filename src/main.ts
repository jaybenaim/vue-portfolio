import Vue from 'vue'
import Buefy from 'buefy'
import VueParticles from 'vue-particles'

import App from './App.vue'

import './registerServiceWorker'
import router from './router'
import { store } from './store'

import 'buefy/dist/buefy.css'
import '@/styles/globals.scss'

Vue.use(Buefy)

Vue.use(VueParticles)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
