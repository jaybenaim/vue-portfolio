<template>
  <div
    id="app"
  >
    <MenuMobile
      :open.sync="open"
      :theme="`is-${theme}`"
      @close="open = false"
      :withAuth="showAuth"
    />

    <div id="nav">
      <Navbar
        v-if="!isMobile"
        :theme="`is-${theme}`"
        fixed-top
        :withAuth="showAuth"
      />

      <Navbar
        v-if="isMobile"
        :theme="`is-${theme}`"
        fixed-top
        @open="open = !open"
        :withAuth="showAuth"
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
import Auth from './mixins/Auth'

export default Auth.extend(Responsive).extend({
  name: 'App',
  mixins: [
    Auth,
    Responsive
  ],
  data() {
    return {
      dbIsReady: false,
      currentRoute: '',
      showAuth: true,
      open: false
    }
  },
  computed: {
    errors() {
      return this.$store.getters.getErrors
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    user() {
      return this.$store.getters.getUser
    },
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
    // this.$store.dispatch('googleInit')

    // Check if user is signed in
    // if (this.$route.fullPath.includes('/blogs')) {
    const token = localStorage.getItem('jvp-token')

    if (token !== 'undefined') {
      const tokenStatus: ITokenResponse | IApiTokenError = await this.$store.dispatch('checkToken')

      if (tokenStatus && tokenStatus.success) {
          // awesome user login in with token
        if (this.$route.path.includes('login')) {
          this.$router.push({
            name: 'Home'
          })
        }
      } else {
          // failed to login with token
        this.$router.push({
          name: 'SignUp'
        })
      }
    }
    // }

    // await this.$store.dispatch('checkToken')

    // Load google to setup google sign in

    // if (this.$route.fullPath.includes('/blogs')) {
    //   this.toggleAuth()
    // }
  },
  updated() {
    // if (this.$route.fullPath.includes('/blogs')) {
    //   this.toggleAuth()
    // }
  },
  methods: {
    /**
     * Show or hide auth if you are on defined route route
     * @param Path to check for
     */
    toggleAuth(path = '/blogs') {
      this.currentRoute = this.$route.fullPath

      if (this.$route.fullPath.includes(path)) {
        this.showAuth = true
      } else {
        this.showAuth = false
      }
    },
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
button {
  position: absolute;
  z-index: 999999999;
}
</style>
