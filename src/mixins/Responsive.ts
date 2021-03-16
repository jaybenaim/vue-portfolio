import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      open: false,
      isMobile: window.innerWidth <= 992,
      screen: '',
      windowWidth: window.innerWidth
    }
  },
  watch: {
    windowWidth() {
      this.windowWidth = this.$store.getters.getWindowSize
    },
    '$store.state.getScreenSize': function watcher() {
      this.isMobile = this.$store.getters.isMobile
      this.screen = this.$store.getters.getScreenSize
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.isMobile = this.$store.getters.isMobile
    this.screen = this.$store.getters.getScreenSize
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$store.commit('setWindowWidth')
      this.windowWidth = this.$store.getters.getWindowSize
      this.isMobile = this.$store.getters.isMobile
      this.screen = this.$store.getters.getScreenSize
    }
  }
})
