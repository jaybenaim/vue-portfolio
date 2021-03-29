<template>
  <div class="account">
    <section class="section is-large mt-5">
      <div class="image is-128x128 m-5">
        <img
          v-if="user.image"
          :src="user.image"
          alt="profile image"
        />

        <div v-else>
          <b-skeleton
            circle
            width="128px"
            height="128px"
          ></b-skeleton>
        </div>
      </div>

      <b-field grouped>
        <b-field>
          <template #label>
            <label for="username">
              Username
              <b-icon
                icon="pencil"
                @click.native="handleEdit('username')"
              />
            </label>
          </template>

          <b-input
            v-if="user.username"
            type="name"
            v-model="formProps.username"
            :disabled="isDisabled.username"
          />

          <b-skeleton
            v-else
            width="40%"
            :animated="true"
            :active="loading"
            size="is-large"
          />
        </b-field>

        <b-field label="Email">
          <template #label>
            <label for="email">
              Email
              <b-icon
                icon="pencil"
                @click.native="handleEdit('email')"
              />
            </label>
          </template>

          <b-input
            v-if="user.email"
            type="email"
            v-model="formProps.email"
            :disabled="isDisabled.email"
          />

          <b-skeleton
            v-else
            width="40%"
            :animated="true"
            :active="loading"
            size="is-large"
          />
        </b-field>
      </b-field>

      <ButtonDefault
        v-if="!isDisabled.username || !isDisabled.email"
        @click.native="handleSave"
        classname="is-flex is-align-justify-content-flex-start is-success"
      >
        Save
      </ButtonDefault>
    </section>
  </div>
</template>

<script lang="ts">
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import { IApiError } from '@/lib/types/errors'
import { IApiUserUpdateResponse, IUser } from '@/lib/types/models/User'
import Auth from '@mixins/Auth'

export default Auth.extend({
  components: { ButtonDefault },
  name: 'account',
  data() {
    return {
      formProps: {
        username: '',
        email: ''
      },
      loading: true,
      isDisabled: {
        username: true,
        email: true
      }
    }
  },
  created() {
    this.formProps.username = this.user.username
    this.formProps.email = this.user.email
  },
  methods: {
    handleEdit(type: 'username' | 'email') {
      this.isDisabled[type] = false
    },
    async handleSave() {
      const updatedUserInfo = this.formProps as IUser

      const updatedProfile: IApiUserUpdateResponse | IApiError = await this.$store.dispatch('updateProfile', {
        id: this.user.id,
        ...updatedUserInfo
      })

      if (updatedProfile.success) {
        this.$router.go(0)
      }
    }
  }
})
</script>

<style lang="scss">
.account {
  label {
    text-align: left;
    color: var(--primary-text-color);
  }
}
</style>
