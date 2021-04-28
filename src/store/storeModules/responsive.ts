const state = {
  windowWidth: window.innerWidth
}

const getters = {
  getWindowSize: (state: any) => state.windowWidth,
  getScreenSize: (state: any) => {
    // Iphone x
    if (state.windowWidth <= 375) {
      return 'sm-phone'
    }

    if (state.windowWidth > 375 && state.windowWidth <= 480) {
      return 'phone'
    }

    if (state.windowWidth > 480 && state.windowWidth <= 768) {
      return 'mobile'
    }

    if (state.windowWidth > 768 && state.windowWidth <= 992) {
      return 'tablet'
    }

    if (state.windowWidth > 992 && state.windowWidth <= 1200) {
      return 'desktop'
    }

    return 'wide'
  },
  isMobile: (state: any) => (state.windowWidth <= 992),
}

const actions = {

}

const mutations = {
  setWindowWidth(state: any) {
    state.windowWidth = window.innerWidth
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
