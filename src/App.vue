<template>
  <div id="app">
    <MenuMobile
      :open.sync="open"
      @close="open = false"
    />

    <div id="nav">
      <Navbar
        v-if="!isMobile"
        fixed-top
      />

      <Navbar
        v-if="isMobile"
        fixed-top
        @open="open = !open"
      />
    </div>

    <!-- Routes -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Responsive from '@mixins/Responsive'

import MenuMobile from '@layout/MenuMobile/menu-mobile.vue'
import Navbar from '@/components/layout/Navbar/navbar-default.vue'

export default {
  name: 'App',
  mixins: [ Responsive ],
  async mounted() {
    await this.$nextTick()

    this.$store.commit('setInitialTheme')
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
