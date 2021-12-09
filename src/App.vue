<template>
  <div
    id="app"
    class="app"
  >
    <MenuMobile
      :open.sync="open"
      :theme="`is-${theme}`"
      @close="open = false"
      :withAuth="showAuth"
      :includeLogo="false"
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

    <!-- Loader -->
    <div
      v-if="isLoading"
      class="app__loader"
    >
      <Loader :isLoading="isLoading"/>
    </div>

    <!-- Notifications -->
    <NotificationDefault
      :isActive="Object.keys(notification).length > 0"
      :notification="notification"
    />

    <!-- Routes -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Auth from './mixins/Auth'

import Responsive from '@mixins/Responsive'

// import * from '@types/gapi.auth2/index'

import MenuMobile from '@layout/MenuMobile/menu-mobile.vue'
import Navbar from '@/components/layout/Navbar/navbar-default.vue'
import Loader from '@atoms/Loader/loader.vue'
import NotificationDefault from '@atoms/Notification/notification-default.vue'

import { IApiResponse, IApiTokenResponse } from './lib/types/api'
import { IApiError, IApiTokenError } from './lib/types/errors'
import { INotification } from './lib/types'

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
    isLoading() {
      return this.$store.getters.isLoading
    },
    showAuth() {
      return this.$route.fullPath.includes('/blogs')
    },
    notification(): INotification {
      return this.$store.getters.getNotification
    }
  },
  async created() {
    // Wake up heroku
    const statusResponse: boolean = this.$store.getters.getDbStatus

    if (!statusResponse) {
      const response: IApiResponse | IApiError = await this.$store.dispatch('getDbStatus')

      this.dbIsReady = response.success
    }

    this.dbIsReady = statusResponse
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
    Navbar,
    Loader,
    NotificationDefault
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-text-color);
}

.app {
  position: relative;

  &__loader {
    position: absolute;
    height: 100%;
    width: 100%;
    @include flex();
  }
}
</style>
