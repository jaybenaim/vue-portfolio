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
        <div
          class="logged-out-buttons is-flex is-flex-direction-row"
          v-if="!isLoggedIn"
        >
          <ButtonDefault
            tag="router-link"
            :to="{
              name: 'Login'
            }"
            @click.native="$emit('close')"
            class="navbar__item m-3"
          >
            Login
          </ButtonDefault>

          <ButtonDefault
            tag="router-link"
            :to="{
              name: 'SignUp'
            }"
            type="is-primary"
            @click.native="$emit('close')"
            class="navbar__item m-3"
          >
            Sign Up
          </ButtonDefault>
        </div>

        <div class="navbar__is-logged-in is-flex is-flex-direction-row">
          <b-navbar-item
            class="navbar__item"
            v-if="isLoggedIn && user && showSignedInAs"
          >
            Signed in as, {{ user.username }}
          </b-navbar-item>

          <ButtonDefault
            v-if="isLoggedIn"
            type="is-secondary"
            @click.native="handleLogout"
          >
            Logout
          </ButtonDefault>
        </div>
      </div>

      <div class="navbar__dark-mode-toggle m-3 is-flex is-flex-align-items-center">
        <SwitchDefault
          class="navbar__item"
          v-if="useDarkModeToggle"
        />
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
          class="navbar__toggle m-2"
          :type="`is-${theme}`"
          icon-left="menu"
          size="is-medium"
        />
      </slot>
    </template>
  </BNavbar>
</template>

<script lang="ts">
import Vue from 'vue'

import Responsive from '@mixins/Responsive'

import { IImage } from '@/lib/types'

import ButtonDefault from '@atoms/ButtonDefault/button-default.vue'
import SwitchDefault from '@/components/atoms/Switch/switch-default.vue'

export default Vue.extend({
  name: 'navbar-default',
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
      default: true
    },
    withAuth: {
      type: Boolean,
      default: false
    },
    useDarkModeToggle: {
      type: Boolean,
      default: true
    },
    showSignedInAs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      user: this.$store.getters.getUser
    }
  },
  watch: {
    '$store.getters.isLoggedIn': function watcher() {
      const isLoggedIn = this.$store.getters.isLoggedIn
      if (isLoggedIn) {
        this.$emit('close')
        this.user = this.$store.getters.getUser
      }
    }
  },
  components: {
    ButtonDefault,
    SwitchDefault
  }
})
</script>

<style lang="scss">
.navbar {
  background-color: transparent !important;

  .navbar-brand {
    background-color: transparent !important;
  }

  &__toggle {
    @include flex($align: center);
  }

  &__item, .navbar-item {
    color: var(--primary-text-color);
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
