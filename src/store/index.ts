import Vue from 'vue'
import Vuex from 'vuex'

import {
 auth, responsive, theme, blogs
} from './storeModules'

Vue.use(Vuex)

export const store = new Vuex.Store({

  modules: {
    auth,
    responsive,
    theme,
    blogs
  }
})

export default store
