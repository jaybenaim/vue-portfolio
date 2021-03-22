<template>
  <div
    class="sign-up section is-large mt-6"
    v-if="isReady"
  >
    <div id="my-signin2"></div>
    sds
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/lib/types/models/User'
import { $createUser } from '@/helpers/google'

/* eslint-disable */
export default Vue.extend({
  name: 'sign-up',
  data() {
    return {
      user: this.$store.getters.getUser as User
    }
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    }, 
    isReady() { 
      return this.$store.getters.isGoogleLoaded
    }
  },
  watch: {
    theme() {
      this.renderButton()
    }
  },
  updated() {
    if (this.isReady) this.renderButton()
  },
  async mounted() { 
    await this.$nextTick() 

    if (this.isReady) this.renderButton()
  },
  methods: {
    handleSuccess(googleUser: gapi.auth2.GoogleUser) {
      const userProfile = $createUser(googleUser)

      this.$store.commit('setUser', userProfile)
    },
    handleErrors(reason: {error: string}) {
      this.$store.commit('error', reason)
    },
    signOut() {
      const auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(() => {
        console.log('User signed out.')
      })
    },

    renderButton() {
      gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: this.theme === 'dark' ? 'light' : 'dark',
        onsuccess: this.handleSuccess,
        onfailure: this.handleErrors
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
