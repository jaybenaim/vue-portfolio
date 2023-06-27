<template>
  <section class="contact section">
    <div class="contact__title-container">
      <h1 class="title primary-text">
        Contact Me
      </h1>

      <em>Contact me for new website builds, programming help and tutoring</em>
    </div>

    <div class="contact__containers mt-6">
      <div class="contact__left-side p-5 pt-6">
        <p class="contact__link-heading mb-3 is-hidden-mobile">
          For a faster response, call or text me
        </p>

        <div class="contact__phone-number mb-6 is-flex is-align-items-center">
          <b-icon icon="phone" />

          <a
            href="tel:6476404714"
            class="phone contact-link"
          >
            (647) 640-4714
          </a>
        </div>

        <div class="contact__email mb-6 is-flex is-align-items-center">
          <b-icon icon="mail" />

          <a
            href="mailto:benaimjacob@gmail.com"
            class="email contact-link"
          >
            benaimjacob@gmail.com
          </a>
        </div>

        <div class="contact__links mb-6">
          <p class="contact__link-heading mb-3 is-hidden-mobile">
            Reach me on any of these platforms:
          </p>

          <SocialLinks :socialLinks="socialLinks" />
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import SocialLinks from '@/components/atoms/SocialLinks/social-links.vue'
import { ISocialLink } from '@/lib/types/components/socialLinks'
import Link from '@/lib/types/components/Link'

export default Vue.extend({
  components: { SocialLinks },
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
  }
})
</script>

<style lang="scss">
.contact {
  width: 100%;

 &__containers {

    @media (max-width: 992px) {
      @include flex($dir: column, $justify: center);
    }

    @include flex($dir: row, $justify: space-evenly);
  }

  &__left-side,
  &__right-side {
    background-color: rgba(var(--background-color-flipped-rgb), 0.15);
    border: 1px solid var(--primary-text-color-flipped);
    @include b-radius();
    min-height: 500px;
    width: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @media (max-width: 992px) {
      width: 80%;
      min-height: 200px;
    }
  }

 &__left-side {
    @media (max-width: 992px) {
      font-size: 1.2em;
    }

    .email {
      @media (max-width: 992px) {
        font-size: 0.7em;
      }
    }
  }

  &__right-side {
    @media (max-width: 992px) {
      margin-top: 3em;
    }
  }

  .icon {
    font-size: 20px;

    &::after {
      content: ' ';
      min-width: 5px;
    }
  }

  .contact-link {
    @include link();
  }
}
</style>
