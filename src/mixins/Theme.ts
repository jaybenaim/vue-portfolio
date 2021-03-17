import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark'
    }
  },
  watch: {
    '$store.state.getTheme': function watcher() {
      console.log('sadf')
      this.theme = this.$store.getters.getTheme
    }
  },
})
