<template>
  <div class="contact container">
    <section class="section mt-6">
      <div class="contact__title-container">
        <h1 class="title primary-text">
          Contact Me
        </h1>

        <em>Contact me for new website builds, programming help and tutoring</em>
      </div>

      <div class="contact__containers mt-6">
        <div class="contact__left-side p-5 pt-6">
          <div class="contact__phone-number mb-6">
            <p class="contact__link-heading mb-3">
              For a fast response, send me a text with any website requests
            </p>

            <b-icon
              icon="phone"
            />

            <a
              href="tel:6476404714"
              class="phone contact-link"
            >
              (647) 640-4714
            </a>
          </div>

          <p>Or</p>

          <div
            class="contact__email mb-6"
          >
            <p class="contact__link-heading mb-3">
              Send me an email
            </p>

            <b-icon
              icon="mail"
            />

            <a
              href="mailto:benaimjacob@gmail.com"
              class="email contact-link"
            >
              benaimjacob@gmail.com
            </a>
          </div>

          <p>Or</p>

          <div
            class="contact__links mb-6"
          >
            <p class="contact__link-heading mb-3">
              Reach me on any of these platforms:
            </p>

            <SocialLinks
              :socialLinks="socialLinks"
            />
          </div>
        </div>

        <div class="contact__right-side p-5">
          <!-- Contact Form -->
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import SocialLinks from '@/components/atoms/SocialLinks/social-links.vue'
import { ISocialLink } from '@/lib/types/components/socialLinks'
import ContactForm from './components/ContactForm/contact-form.vue'
import Link from '@/lib/types/components/Link'

export default Vue.extend({
  components: { ContactForm, SocialLinks },
  name: 'contact',
  data() {
    return {
      socialLinks: [
        {
          label: 'Linked In',
          className: 'linked-in',
          link: new Link({
            href: 'https://www.linkedin.com/in/jacob-benaim-a64a0818a/'
          }),
          icon: {
            icon: 'linkedin',
            size: 'is-large'
          }
        },
        {
          label: 'Github',
          className: 'github',
          link: new Link({
            href: 'https://github.com/jaybenaim'
          }),
          icon: {
            icon: 'github',
            size: 'is-large'
          }
        }
      ] as ISocialLink[]
    }
  },
  created() {
  }
})
</script>

<style lang="scss">
.contact {

  &__containers {
    @include flex($dir: row, $justify: space-evenly);
  }

  &__left-side,
  &__right-side {
    background-color: rgba(var(--background-color-flipped-rgb), 0.15);
    border: 1px solid var(--primary-text-color-flipped);
    min-height: 500px;
    width: 40%;
  }

  .icon {
    font-size: 20px;

    &::after {
      content: ' ';
      min-width: 5px;
    }
  }

  .contact-link {
    font-size: 20px;
    @include link()
  }
}
</style>
