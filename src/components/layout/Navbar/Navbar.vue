<template>
  <BNavbar
    class="navbar"
    v-bind="$attrs"
  >
    <template #brand>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }"
      >
        <img
          v-bind="logo"
        />
      </b-navbar-item>
    </template>

    <template #start>
      <b-navbar-item
        to="/"
        tag="router-link"
        class="navbar__item"
      >
        Home
      </b-navbar-item>

      <b-navbar-item
        to="/blogs"
        tag="router-link"
        class="navbar__item"
      >
        Blogs
      </b-navbar-item>

      <b-navbar-item
        to="/about"
        tag="router-link"
        class="navbar__item"
      >
        About
      </b-navbar-item>

      <b-navbar-item
        to="/contact"
        tag="router-link"
        class="navbar__item"
      >
        Contact
      </b-navbar-item>
    </template>

    <template #end>
      <div
        class="navbar__auth"
        v-if="withAuth"
      >
        <b-navbar-item tag="div">
          <div class="buttons">
            <ButtonDefault
              tag="router-link"
              to="sign-up"
              type="is-primary"
            >
              Sign Up
            </ButtonDefault>

            <ButtonDefault
              tag="router-link"
              to="login"
              type="is-light"
            >
              Log In
            </ButtonDefault>
          </div>
        </b-navbar-item>
      </div>
    </template>

    <template
      #burger
      v-if="useCustomToggle"
    >
      <!-- Toggler -->
      <slot v-if="isMobile">
        <ButtonDefault
          @clicked="$emit('open')"
          class="navbar__toggle m-4"
        >
          <b-icon
            icon="menu"
            size="is-big"
          />
        </ButtonDefault>
      </slot>
    </template>
  </BNavbar>
</template>

<script lang="ts">
import Vue from 'vue'

import Responsive from '@mixins/Responsive'

import { IImage } from '@/lib/types'

import ButtonDefault from '@atoms/ButtonDefault/button-default.vue'

export default Vue.extend({
  name: 'navbar',
  mixins: [ Responsive ],
  props: {
    /**
    * Image object that contains the logo data.
    */
    logo: {
      type: Object as () => IImage,
      default: () => ({
        src: 'https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png',
        alt: 'Brand Logo',
        ratio: '1by1'
      } as IImage)
    },
    showLinks: {
      type: Boolean,
      default: true
    },
    useCustomToggle: {
      type: Boolean,
      default: false
    },
    withAuth: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ButtonDefault
  }
})
</script>

<style lang="scss">
.navbar {
  background-color: var(--black) !important;

  &__toggle {
    @include flex($align: center);
  }

  &__item, .navbar-item {
    color: var(--white);
    font-size: 18px;
  }

  @media (max-width: 992px) {
    .navbar-brand {
      width: 100%;
      @include flex($justify: space-between);
    }
  }
}

</style>
