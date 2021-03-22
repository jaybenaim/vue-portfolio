<template>
  <div
    id="app"
  >
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
import Vue from 'vue'
import Responsive from '@mixins/Responsive'
import { $get } from '@/helpers/api/get'

// import '@types/gapi.auth2/index'

import MenuMobile from '@layout/MenuMobile/menu-mobile.vue'
import Navbar from '@/components/layout/Navbar/navbar-default.vue'
import { $googleInit } from './helpers/google'

export default Vue.extend({
  name: 'App',
  mixins: [ Responsive ],
  data() {
    return {
      dbIsReady: false,
      googleIsReady: false
    }
  },
  computed: {
    errors() {
      return this.$store.getters.getErrors
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  async created() {
    // Wake up heroku
    if (!this.dbIsReady) {
      const response = await $get()

      if (response.data.status === 'success') {
        this.dbIsReady = true
      } else {
        this.dbIsReady = false
        this.$store.commit('error', response.data)
      }
    }

    $googleInit()

    this.googleIsReady = this.$store.getters.isGoogleLoaded
  },
  async mounted() {
    await this.$nextTick()

    this.$store.commit('setInitialTheme')
  },
  methods: {

    /**
     * Listener method for sign-out live value.
     *
     * @param {boolean} val the updated signed out state.
     */
    signinChanged(val: boolean) {
      console.log('Signin state changed to ', val)
      return val
    },
    /**
   * Listener method for when the user changes.
   *
   * @param {GoogleUser} user the updated user.
   */
    userChanged(user: gapi.auth2.GoogleUser) {
      console.log(user)
      this.$store.commit('setUser', user)
    }
  },
  components: {
    MenuMobile,
    Navbar
  }
})
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
