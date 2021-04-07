import Vue from 'vue'
import Vuex from 'vuex'

import {
 auth, responsive, theme, blogs, general, github
} from './storeModules'

Vue.use(Vuex)

export const store = new Vuex.Store({

  modules: {
    general,
    auth,
    responsive,
    theme,
    blogs,
    github
  }
})

export default store
