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
      class="has-text-left"
    >
      <template #header>
        <p class="modal-card-title">
          Sign Up
        </p>

        <button
          type="button"
          class="delete"
          @click="handleClose"
        />
      </template>

      <template #default>
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
            required
          />
        </b-field>

        <b-field
          label="Confirm Password"
          :message="errors.password2"
          :type="{ 'is-danger': errors.password2
            || (formData.password.length > 0
              && formData.password2 !== formData.password)
          }"
        >
          <b-input
            v-model="formData.password2"
            type="password"
            placeholder="*********"
            required
          />
        </b-field>

        <!-- Google Sign in -->
        <div
          v-if="useGoogleSignIn && googleSignUpBtnIsReady"
          id="sign-in"
          class="sign-up__google mt-6 is-flex is-justify-content-center"
        ></div>
      </template>

      <template #footer>
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
      </template>
    </ModalDefault>
  </div>
</template>

<script lang="ts">
import Auth from '@mixins/Auth'

import {
 IApiUserErrorType, IApiUserResponse, ISignUpData, IUser
} from '@/lib/types/models/User'
import ModalDefault from '@organisms/Modal/ModalDefault/modal-default.vue'
import { IApiUserError } from '@/lib/types/errors'

export default Auth.extend({
  name: 'sign-up',
  mixins: [Auth],
  data() {
    return {
      formData: {
        name: '',
        email: '',
        username: '',
        password: '',
        password2: ''
      } as IUser,
      errors: {
        name: '',
        email: '',
        password: '',
        password2: ''
      } as IApiUserError
    }
  },
  created() {
    if (this.isLoggedIn) this.$router.push({ name: 'Home' })

    this.useGoogleSignIn && this.renderButtonIfReady()
  },
  methods: {
    async handleSubmit() {
      const user = this.formData as ISignUpData

      const userResponse: IApiUserResponse | IApiUserError = await this.$store.dispatch('signUp', user)

      if (userResponse) {
        if (userResponse.success && userResponse.isAuthenticated) {
          this.handleClose()
        }

        if (!userResponse.success) {
          for (const error of Object.keys(userResponse)) {
            this.errors[error as IApiUserErrorType] = userResponse[error as IApiUserErrorType]
          }
        }
      }
    }
  },
  components: { ModalDefault },
})
</script>

<style lang="scss">
.sign-up {
  .label {
    text-align: left;
  }

  .modal-card {
    &__head,
    &__body,
    &__footer,
    .modal-card-title {
      @include theme()
    }
  }
}
</style>
