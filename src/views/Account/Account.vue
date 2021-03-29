<template>
  <div class="account">
    <section class="section is-large mt-6">
      <div class="media ml-1 mt-4 mb-6">
        <div class="media-left">
          <img
            v-if="user.image"
            :src="user.image"
            alt="profile image is-128x128"
          />

          <div v-else>
            <b-skeleton
              circle
              width="128px"
              height="128px"
            ></b-skeleton>
          </div>
        </div>

        <div
          class="media-right is-flex is-align-items-flex-start"
        >
          <b-icon
            :type="`is-${theme === 'light' ? 'dark' : 'light'}`"
            class="edit-icon is-flex is-align-self-flex-start"
            icon="pencil"
            @click.native="handleEdit('email')"
          />

          <div class="upload ml-3 is-flex is-align-items-flex-start">
            <UploadDragAndDrop
              :showLabel="false"
            />
          </div>
        </div>
      </div>

      <b-field grouped>
        <b-field>
          <template #label>
            <label for="username">
              Username
              <b-icon
                :type="`is-${theme === 'light' ? 'dark' : 'light'}`"
                class="edit-icon"
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
                :type="`is-${theme === 'light' ? 'dark' : 'light'}`"
                class="edit-icon"
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
import Auth from '@mixins/Auth'

import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import { IApiError } from '@/lib/types/errors'
import { IApiUserUpdateResponse, IUser } from '@/lib/types/models/User'
import Theme from '@/mixins/Theme'
import UploadDragAndDrop from '@/components/organisms/input/UploadDragAndDrop/upload-drag-and-drop.vue'

export default Auth.extend(Theme).extend({
  components: {
    ButtonDefault,
    UploadDragAndDrop
  },
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
        email: true,
        image: true
      }
    }
  },
  created() {
    this.formProps.username = this.user.username
    this.formProps.email = this.user.email
  },
  methods: {
    handleEdit(type: 'username' | 'email' | 'image') {
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

  .edit-icon {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
