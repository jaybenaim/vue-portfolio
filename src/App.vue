<template>
  <div
    id="app"
  >
    <MenuMobile
      :open.sync="open"
      :theme="`is-${theme}`"
      @close="open = false"
    />

    <div id="nav">
      <Navbar
        v-if="!isMobile"
        :theme="`is-${theme}`"
        fixed-top
        withAuth
      />

      <Navbar
        v-if="isMobile"
        :theme="`is-${theme}`"
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
import { $get } from '@/helpers/api/get'

// import * from '@types/gapi.auth2/index'

import MenuMobile from '@layout/MenuMobile/menu-mobile.vue'
import Navbar from '@/components/layout/Navbar/navbar-default.vue'
import { IStatusResponse, ITokenResponse } from './lib/types/api'
import { IApiTokenError } from './lib/types/errors'

export default Responsive.extend({
  name: 'App',
  mixins: [ Responsive ],
  data() {
    return {
      dbIsReady: false,
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
      const response: IStatusResponse | void = await $get()

      if (response && response.status === 'success') {
        this.dbIsReady = true
      } else {
        this.dbIsReady = false
        this.$store.commit('error', response)
      }
    }
  },
  async mounted() {
    // Set Theme
    this.$store.commit('setInitialTheme')

    // Check if user is signed in
    if (!this.isLoggedIn) {
      const tokenStatus: ITokenResponse | IApiTokenError = await this.$store.dispatch('checkToken')
      if (tokenStatus.success) {
          // awesome user login in with token
      } else {
          // failed to login with token
        this.$router.push({
          name: 'Login'
        })
      }
    }

    await this.$store.dispatch('checkToken')
    // Load google to setup google sign in
    await this.$store.dispatch('googleInit')
  },
  methods: {
  //   /**
  //    * Listener method for sign-out live value.
  //    *
  //    * @param {boolean} val the updated signed out state.
  //    */
  //   signinChanged(val: boolean) {
  //     console.log('Signin state changed to ', val)
  //     return val
  //   },
  //   /**
  //  * Listener method for when the user changes.
  //  *
  //  * @param {GoogleUser} user the updated user.
  //  */
  //   userChanged(user: gapi.auth2.GoogleUser) {
  //     console.log(user)
  //     this.$store.commit('setUser', { user })
  //   }
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
