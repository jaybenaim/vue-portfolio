<template>
  <div class="contact-form">
    <section>
      <h2 class="contact-form__heading">
        Send me a message
      </h2>

      <Loader
        class="repo-section__loader"
        :isLoading="isLoading"
        :isFullPage="false"
      />

      <b-field
        label="Name"
        :type="errors.name ? 'is-danger' : ''"
        :message="errors.name"
      >
        <b-input
          v-model="formProps.name"
          required
        ></b-input>
      </b-field>

      <b-field
        label="Email"
        :type="errors.email ? 'is-danger' : ''"
        :message="errors.email"
      >
        <b-input
          type="email"
          v-model="formProps.email"
          required
        >
        </b-input>
      </b-field>

      <b-field
        label="Message"
        :type="errors.message ? 'is-danger' : ''"
        :message="errors.message"
      >
        <b-input
          maxlength="400"
          type="textarea"
          v-model="formProps.message"
          required
        ></b-input>
      </b-field>

      <b-field type="submit">
        <ButtonDefault
          label="Send"
          size="is-medium"
          :type="`is-${theme}`"
          @click.native="sendEmail"
          :disabled="isBtnDisabled"
        />
      </b-field>

      <span
        v-if="errors.unknown"
        class="help is-danger unknown"
      >{{ errors.unknown }}</span>
    </section>
  </div>
</template>

<script lang="ts">
import Theme from '@/mixins/Theme'

import {
 $sendEmail, IApiMessageDataResponse, TMessageField
} from '@/helpers/email/email'
import { IMessageData, INotification } from '@/lib/types'
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import Loader from '@atoms/Loader/loader.vue'

export default Theme.extend({
  name: 'contact-form',
  components: {
    ButtonDefault,
    Loader
  },
  data() {
    return {
      isBtnDisabled: true,
      isLoading: false,
      formProps: {
        name: '',
        email: '',
        message: ''
      } as IMessageData,
      errors: {
        name: '',
        email: '',
        message: '',
        unknown: ''
      }
    }
  },
  updated() {
    if (this.errors.unknown) {
      this.isBtnDisabled = true
    } else {
      this.isBtnDisabled = this.isDisabled()
    }
  },
  methods: {
    isDisabled() {
      const isDisabled = []

      // If all the fields are filled
      for (const field in this.formProps) {
        if (!this.formProps[field as TMessageField]) {
          isDisabled.push(true)
        }
      }

      // If there are any errors from buefy
      if (document.querySelectorAll('.help').length > 0) {
        for (let element of document.querySelectorAll('.help')) {
          element = element as Element

          if (element.classList.value.includes('is-danger')) {
            isDisabled.push(true)
          }
        }
      }

      if (this.errors.unknown) {
        isDisabled.push(true)
      }

      this.isBtnDisabled = isDisabled.includes(true)

      return isDisabled.includes(true)
    },
    async sendEmail() {
      this.isLoading = true

      const messageResponse: IApiMessageDataResponse = await $sendEmail(this.formProps)

      if (messageResponse.success) {
        this.isLoading = false

        this.$store.commit('setNotification', {
          message: 'Message sent successfully!',
          type: 'is-success',
          autoClose: true
        } as INotification)
      } else {
        this.isLoading = false

        if (messageResponse.data === undefined) {
          this.errors.unknown = 'Something unexpected occurred, please try again later.'

          setTimeout(() => {
            this.errors.unknown = ''
            this.isBtnDisabled = false
          }, 4000)
        }

        for (const error in messageResponse.data) {
          if (error) {
            this.errors[error as TMessageField] = messageResponse.data[error as TMessageField]
          }
        }
      }
    }
  }
})
</script>

<style lang="scss">
.contact-form {
  &__heading {
    font-size: 24px;
    font-weight: 500;
  }

  label {
    color: var(--primary-text-color);
    text-align: left;
  }

  .help {
    font-size: 1rem;
    text-align: left;
  }

  .help.is-danger.unknown {
    text-align: center;
  }
}
</style>
