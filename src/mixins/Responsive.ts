import Theme from './Theme'

export default Theme.extend({
  mixins: [Theme],
  computed: {
    windowWidth() {
      return this.$store.getters.getWindowSize
    },
    screen() {
      return this.$store.getters.getScreenSize
    },
    isMobile() {
      return this.$store.getters.isMobile
    },
  },

  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$store.commit('setWindowWidth')
    }
  }
})
