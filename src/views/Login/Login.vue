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
        <header class="modal-card-head modal-card__head theme-colors">
          <p class="modal-card-title">
            Login
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
              required
            />
          </b-field>

          <!-- Google sign in  -->
          <div v-if="googleSignUpBtnIsReady">
            <div
              id="sign-in"
              class="sign-up__google mt-6 is-flex is-justify-content-center"
            ></div>
          </div>
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
            label="Login"
            type="is-primary"
            class="is-align-self-flex-end"
            @click.prevent="handleLogin"
          />
        </footer>
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
 IUser, User
} from '@/lib/types/models/User'
import {
 IApiError, IApiLoginError, IApiUserError
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
    if (this.$store.getters.isLoggedIn) this.$router.push({ name: 'Home' })
  },
  watch: {
    isLoggedIn() {
      this.isLoggedIn && this.$emit('close')
    }
  },
  mounted() {
    this.renderButtonIfReady()
  },
  methods: {
    async handleLogin() {
      const user = new User(this.formData)

      const userResponse: IApiLoginResponse | IApiLoginError = await this.$store.dispatch('login', user.getLoginData())
      console.log(userResponse)
      if (userResponse
      && userResponse.success
      && userResponse.user.isAuthenticated) {
        this.$emit('close')
      }

      if (userResponse && !userResponse.success) {
        for (const error of Object.keys(userResponse)) {
          this.errors[error as IApILoginErrorType] = userResponse[error as IApILoginErrorType]
        }
      } else {
        this.$store.commit('error', {
          error: {
            name: 'UnknownError',
            message: 'Something went wrong'
          },
          success: false
        } as IApiError)
      }
    }
  },
  components: { ModalDefault },
})
</script>

<style lang="scss" scoped>

</style>
