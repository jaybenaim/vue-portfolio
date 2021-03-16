<template>
  <div id="app">
    <MenuMobile
      :open.sync="open"
      @close="open = false"
    />

    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>

      <!-- Open Toggler -->
      <slot v-if="screen === 'tablet' || screen === 'mobile'">
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

export default {
  name: 'App',
  data() {
    return {
      open: false,
      screen: undefined as any,
      windowWidth: window.innerWidth
    }
  },
  watch: {
    windowWidth() {
      this.windowWidth = this.$store.getters.getWindowSize
    },
    '$store.state.getScreenSize': function watcher() {
      this.screen = this.$store.getters.getScreenSize
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.screen = this.$store.getters.getScreenSize
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.$store.commit('setWindowWidth')
      this.windowWidth = this.$store.getters.getWindowSize
      this.screen = this.$store.getters.getScreenSize
    }
  },
  components: {
    MenuMobile
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
