import Vue from 'vue'

import { $createUser } from '@/helpers/google'

import $store from '@/store'

export default Vue.extend({
  data() {
    return {
      googleSignUpBtnIsReady: false
    }
  },
  computed: {
    theme() {
      return $store.getters.getTheme
    },
    isGoogleLoaded() {
      return $store.getters.isGoogleLoaded
    },
    isLoggedIn() {
      return $store.getters.isLoggedIn
    }
  },
  mounted() {
    $store.dispatch('googleInit')
  },
  methods: {
    /**
     * Only renders the sign up button if its ready
     *
     * @returns Bool - If the button was ready to load or not
     */
    renderButtonIfReady() {
      if (this.$route.path.includes('login') || this.$route.path.includes('sign-up')) {
        if (this.isGoogleLoaded && !this.googleSignUpBtnIsReady && !this.isLoggedIn) {
          this.renderButton()
        }

        return true
      }
      return false
    },
    /**
     * Renders the google sign in button
     */
    async renderButton() {
      this.googleSignUpBtnIsReady = true

      await this.$nextTick()

      window.gapi.signin2.render('sign-in', {
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

      this.googleSignUpBtnIsReady = false
    },
    /**
     * Handle modal close
     */
    handleClose() {
      this.$router.go(-1)
    }
  }
})
