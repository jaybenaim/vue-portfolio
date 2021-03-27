const state = {
  windowWidth: window.innerWidth
}

const getters = {
  getWindowSize: (state: any) => state.windowWidth,
  getScreenSize: (state: any) => {
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
