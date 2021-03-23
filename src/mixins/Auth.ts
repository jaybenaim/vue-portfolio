import Vue from 'vue'

import { $createUser } from '@/helpers/google'

import $store from '@/store'

export default Vue.extend({
  computed: {
    theme() {
      return $store.getters.getTheme
    },
    isReady() {
      return $store.getters.isGoogleLoaded
    },
    isLoggedIn() {
      return $store.getters.isLoggedIn
    }
  },
  watch: {
    theme() {
      this.renderButton()
    },
    isReady() {
      if ($store.getters.isLoggedIn) this.$router.push({ name: 'Home' })
    },
    '$store.getters.isLoggedIn': function watcher() {
      if ($store.getters.isLoggedIn) this.$router.push({ name: 'Home' })
      this.$emit('close')
    }
  },
  updated() {
    if (this.isReady && !this.isLoggedIn) this.renderButton()
  },
  async mounted() {
    await this.$nextTick()

    if (this.isReady) this.renderButton()
  },
  created() {
    if ($store.getters.isLoggedIn) this.$router.push({ name: 'Home' })
  },
  methods: {
    /**
     * Renders the google sign in button
     */
    renderButton() {
      gapi.signin2.render('sign-in', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: this.theme === 'dark' ? 'light' : 'dark',
        onsuccess: this.handleSuccess,
        onfailure: this.handleErrors
      })
    },
    /**
     * Get's called when a user successfully signs in with google
     * @param googleUser
     */
    handleSuccess(googleUser: gapi.auth2.GoogleUser) {
      const userProfile = $createUser(googleUser)

      $store.commit('setUser', {
        user: userProfile
      })
    },
    /**
     * Gets called if there is an error with google sign in
     * @param reason
     */
    handleErrors(reason: {error: string}) {
      $store.commit('error', reason)
    },
    /**
     * Handle modal close
     */
    handleClose() {
      this.$router.go(-1)
    }
  }
})
