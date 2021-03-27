import Vue from 'vue'

export default Vue.extend({
  computed: {
    theme() {
      return this.$store.getters.getTheme
    }
  }
})
