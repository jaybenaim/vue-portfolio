const state = {
  theme: localStorage.getItem('theme') || 'dark',
}

const getters = {
  getTheme: (state: any) => state.theme
}

const actions = {

}

const mutations = {
  setInitialTheme(state: any) {
    const currentTheme = localStorage.getItem('theme') || 'dark'

    state.theme = currentTheme

    document.body.setAttribute('data-theme', currentTheme)
  },
  toggleTheme(state: any) {
    const currentTheme = localStorage.getItem('theme')
    const themeAfterChange = currentTheme === 'dark' ? 'light' : 'dark'

    state.theme = themeAfterChange

    document.body.setAttribute('data-theme', themeAfterChange)
    localStorage.setItem('theme', themeAfterChange)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
