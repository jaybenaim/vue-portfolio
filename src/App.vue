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
        showSignedInAs
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
import { IApiStatusResponse, IApiTokenResponse } from './lib/types/api'
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
      const response: IApiStatusResponse | void = await $get()

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
    const token = localStorage.getItem('jvp-token')
    const currentUser = Object.keys(this.$store.getters.getUser).length > 0

    await this.$nextTick()

    if (!currentUser && token && token !== 'undefined') {
      const tokenStatus: IApiTokenResponse | IApiTokenError = await this.$store.dispatch('checkToken')

      if (tokenStatus && tokenStatus.success) {
        console.log('Signed in with token.')
      } else {
        console.log('Failed to login with token.')
      }
    }
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
