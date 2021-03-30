import Vue from 'vue'

import { $createUserFromGoogleUser } from '@/helpers/google'

import { store } from '@/store'

export default Vue.extend({
  props: {
    useGoogleSignIn: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      googleSignUpBtnIsReady: false
    }
  },
  computed: {
    theme() {
      return store.getters.getTheme
    },
    isGoogleLoaded() {
      return store.getters.isGoogleLoaded
    },
    isLoggedIn() {
      return store.getters.isLoggedIn
    },
    user() {
      return store.getters.getUser
    }
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
    async handleSuccess(googleUser: gapi.auth2.GoogleUser) {
      const userProfile = $createUserFromGoogleUser(googleUser)

      store.commit('setUser', {
        user: userProfile,
        googleUser
      })

      const token = await googleUser.getAuthResponse().access_token

      store.commit('setJwtToken', token)
    },
    /**
     * Gets called if there is an error with google sign in
     * @param reason
     */
    handleErrors(reason: {error: string}) {
      store.commit('error', reason)

      this.googleSignUpBtnIsReady = false
    },
    /**
     * Handle modal close
     */
    handleClose() {
      this.$router.go(-1)
    },
    handleLogout() {
      this.$store.dispatch('logout')
    }
  }
})
