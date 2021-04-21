<template>
  <div class="login container is-large mt-6">
    <ModalDefault
      destroy-on-hide
      aria-role="dialog"
      aria-label="Login"
      :active="true"
      :has-modal-card="true"
      @close="handleClose"
      class="has-text-left"
    >
      <template #header>
        <p class="modal-card-title">
          Login
        </p>

        <button
          type="button"
          class="delete"
          @click="handleClose"
        />
      </template>

      <template #default>
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
            password-reveal
            required
          />
        </b-field>

        <!-- Google sign in  -->
        <div v-if="useGoogleSignIn && googleSignUpBtnIsReady">
          <div
            id="sign-in"
            class="sign-up__google mt-6 is-flex is-justify-content-center"
          ></div>
        </div>
      </template>

      <template #footer>
        <b-button
          label="Cancel"
          @click="handleClose"
        />

        <b-button
          label="Login"
          type="is-primary"
          class="is-align-self-flex-end"
          @click.prevent="handleLogin"
        />
      </template>
    </ModalDefault>
  </div>
</template>

<script lang="ts">
import Auth from '@mixins/Auth'

import ModalDefault from '@organisms/Modal/ModalDefault/modal-default.vue'
import {
  IApILoginErrorType,
  IApiLoginResponse,
  ILoginData,
 IUser
} from '@/lib/types/models/User'
import {
  IApiLoginError,
 IApiUserError
} from '@/lib/types/errors'

export default Auth.extend({
  name: 'login',
  mixins: [Auth],
  data() {
    return {
      formData: {
        email: '',
        password: '',
      } as IUser,
      errors: {
        email: '',
        password: '',
      } as IApiUserError
    }
  },
  created() {
    if (this.$store.getters.isLoggedIn) this.handleClose()
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.handleClose()
      }
    }
  },
  mounted() {
    this.renderButtonIfReady()
  },
  methods: {
    async handleLogin() {
      const user = this.formData as ILoginData

      const userResponse: IApiLoginResponse | IApiLoginError = await this.$store.dispatch('login', user)

      if (userResponse) {
        if (userResponse.success
            && userResponse.isAuthenticated) {
          this.handleClose()
        }
        if (!userResponse.success) {
          for (const error of Object.keys(userResponse)) {
            this.errors[error as IApILoginErrorType]
          = userResponse[error as IApILoginErrorType]
          }
        }
      }
    }
  },
  components: { ModalDefault },
})
</script>

<style lang="scss">
.login {

}
</style>
