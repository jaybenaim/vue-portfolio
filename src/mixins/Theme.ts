import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      theme: this.$store.getters.getTheme
    }
  },
  // watch: {
  //   '$store.state.getTheme': function watcher() {
  //     this.theme = this.$store.getters.getTheme
  //   }
  // },
})
