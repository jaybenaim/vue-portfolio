<template>
  <div id="app">
    <MenuMobile
      :open.sync="open"
      @close="open = false"
    />

    <div id="nav">
      <Navbar />

      <!-- Open Toggler -->
      <slot v-if="isMobile">
        <b-button
          @click="open = !open"
        >
          <b-icon
            icon="menu"
            size="is-big"
          />
        </b-button>
      </slot>
    </div>

    <!-- Routes -->
    <router-view />
  </div>
</template>

<script lang="ts">
import MenuMobile from '@layout/MenuMobile/menu-mobile.vue'
import Navbar from '@layout/Navbar/Navbar'

export default {
  name: 'App',
  data() {
    return {
      open: false,
      isMobile: undefined as any,
      windowWidth: window.innerWidth
    }
  },
  watch: {
    windowWidth() {
      this.windowWidth = this.$store.getters.getWindowSize
    },
    '$store.state.getScreenSize': function watcher() {
      this.isMobile = this.$store.getters.isMobile
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.isMobile = this.$store.getters.isMobile
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$store.commit('setWindowWidth')
      this.windowWidth = this.$store.getters.getWindowSize
      this.isMobile = this.$store.getters.isMobile
    }
  },
  components: {
    MenuMobile,
    Navbar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
