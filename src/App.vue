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
import Responsive from '@mixins/Responsive'
import MenuMobile from '@layout/MenuMobile/menu-mobile.vue'
import Navbar from '@layout/Navbar/navbar.vue'

export default {
  name: 'App',
  mixins: [ Responsive ],
  data() {
    return {
      open: false
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
