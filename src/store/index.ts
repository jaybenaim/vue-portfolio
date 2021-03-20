import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    windowWidth: window.innerWidth,
    theme: localStorage.getItem('theme') || 'dark',
    errors: {}
  },
  getters: {
    getWindowSize: (state) => state.windowWidth,
    getScreenSize: (state) => {
      if (state.windowWidth <= 320) {
        return 'sm-phone'
      }

      if (state.windowWidth <= 480 && state.windowWidth >= 321) {
        return 'phone'
      }

      if (state.windowWidth <= 768 && state.windowWidth >= 481) {
        return 'mobile'
      }

      if (state.windowWidth >= 481 && state.windowWidth <= 992) {
        return 'tablet'
      }

      if (state.windowWidth >= 993 && state.windowWidth <= 1200) {
        return 'desktop'
      }

      return 'wide'
    },
    isMobile: (state) => (state.windowWidth <= 992),
    getTheme: (state) => state.theme,
    getErrors: (state) => state.errors
  },
  mutations: {
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth
    },
    setInitialTheme(state) {
      const currentTheme = localStorage.getItem('theme') || 'dark'

      state.theme = currentTheme

      document.body.setAttribute('data-theme', currentTheme)
    },
    toggleTheme(state) {
      const currentTheme = localStorage.getItem('theme')
      const themeAfterChange = currentTheme === 'dark' ? 'light' : 'dark'

      state.theme = themeAfterChange

      document.body.setAttribute('data-theme', themeAfterChange)
      localStorage.setItem('theme', themeAfterChange)
    },
    error(state, errors) {
      state.errors = errors
    }
  },
  actions: {
  },
  modules: {
  }
})
