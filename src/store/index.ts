import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: window.innerWidth
  },
  getters: {
    getWindowSize: (state) => state.windowWidth,
    getScreenSize: (state) => {
      if (state.windowWidth <= 480) {
        return 'mobile'
      }

      if (state.windowWidth >= 481 && state.windowWidth <= 992) {
        return 'tablet'
      }

      if (state.windowWidth >= 993 && state.windowWidth <= 1200) {
        return 'desktop'
      }

      return 'wide'
    }
  },
  mutations: {
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth
    }
  },
  actions: {
  },
  modules: {
  }
})
