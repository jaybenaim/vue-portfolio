<template>
  <div
    class="sign-up container is-large mt-6"
  >
    <ModalDefault
      destroy-on-hide
      aria-role="dialog"
      aria-label="Sign up"
      :active="true"
      :has-modal-card="true"
      @close="handleClose"
    >
      <template #header>
        <header class="modal-card-head modal-card__head theme-colors">
          <p class="modal-card-title">
            Sign Up
          </p>

          <button
            type="button"
            class="delete"
            @click="handleClose"
          />
        </header>
      </template>

      <template #default>
        <section class="modal-card-body modal-card__body theme-colors">
          <b-field
            label="Name"
            :message="errors.name"
            :type="{ 'is-danger': errors.name }"
          >
            <b-input
              v-model="formData.name"
              placeholder="Name"
              required
            />
          </b-field>

          <b-field
            label="Email"
            :message="errors.email"
            :type="{ 'is-danger': errors.email }"
          >
            <b-input
              v-model="formData.email"
              type="email"
              placeholder="Email"
              required
            />
          </b-field>

          <b-field
            label="Password"
            :message="errors.password"
            :type="{ 'is-danger':
              (formData.password
                && formData.password.length < 6)
              || errors.password
            }"
          >
            <b-input
              v-model="formData.password"
              type="password"
              placeholder="*********"
              validation-message="Must be at least 6 characters."
            />
          </b-field>

          <b-field
            label="Confirm Password"
            :message="errors.confirmPassword"
            :type="{ 'is-danger': errors.confirmPassword
              || (formData.password.length > 0
                && formData.confirmPassword !== formData.password)
            }"
          >
            <b-input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="*********"
            />
          </b-field>

          <div
            v-if="isReady"
            id="my-signin2"
            class="sign-up__google mt-6 is-flex is-justify-content-center"
          ></div>
        </section>
      </template>

      <template #footer>
        <footer
          class="modal-card-foot modal-card__footer p-3 mb-5 theme-colors is-flex is-justify-content-space-between"
        >
          <b-button
            label="Cancel"
            @click="handleClose"
          />

          <b-button
            label="Sign Up"
            type="is-primary"
            class="is-align-self-flex-end"
            @click.prevent="handleSubmit"
          />
        </footer>
      </template>
    </ModalDefault>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/lib/types/models/User'
import { $createUser } from '@/helpers/google'
import ModalDefault from '@/components/organisms/Modal/ModalDefault/modal-default.vue'

/* eslint-disable */
export default Vue.extend({
  components: { ModalDefault },
  name: 'sign-up',
  data() {
    return {
      user: this.$store.getters.getUser as User, 
      formData: {
        name: '', 
        email: '', 
        username: '',
        password: '',
        confirmPassword: ''
      }, 
      errors: { 
        name: '', 
        email: '', 
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    }, 
    isReady() { 
      return this.$store.getters.isGoogleLoaded
    }, 
    isLoggedIn() { 
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    theme() {
      this.renderButton()
    }, 
    isReady() { 
      if (this.$store.getters.isLoggedIn) this.$router.go(-1)
    }, 
    '$store.getters.isLoggedIn': function watcher (){ 
     if (this.$store.getters.isLoggedIn) this.$router.go(-1)
     this.$emit('close')
    }
  },
  updated() {
    if (this.isReady) this.renderButton()
  },
  async mounted() { 
    await this.$nextTick() 

    if (this.isReady) this.renderButton()
  },
  created() { 
    if (this.$store.getters.isLoggedIn) this.$router.go(-1)
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
      this.$store.commit('isLoggedIn', false)
    },
    handleClose() { 
      this.$router.go(-1)
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
.sign-up { 

}
</style>
