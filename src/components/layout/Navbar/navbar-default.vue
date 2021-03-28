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
        class="navbar__auth is-flex is-flex-direction-row is-align-items-center"
        v-if="withAuth"
      >
        <div v-if="isLoggedIn">
          <b-navbar-dropdown
            label="Account"
            class="account-label"
          >
            <!-- <div class="navbar__is-logged-in is-flex is-flex-direction-row"> -->
            <b-navbar-item
              class="navbar__item"
              v-if="isLoggedIn && user && showSignedInAs"
            >
              Signed in as, {{ user.username }}
            </b-navbar-item>

            <ButtonDefault
              class="navbar__item m-3"
              v-if="isLoggedIn"
              type="is-secondary"
              @click.native="handleLogout"
            >
              Logout
            </ButtonDefault>
            <!-- </div> -->
          </b-navbar-dropdown>
        </div>

        <div
          v-else
          class="logged-out-buttons is-flex is-flex-direction-row is-align-items-center"
        >
          <ButtonDefault
            class="navbar__item m-3 login-btn"
            tag="router-link"
            :to="{
              name: 'Login'
            }"
            @click.native="$emit('close')"
          >
            Login
          </ButtonDefault>

          <ButtonDefault
            class="navbar__item m-3"
            tag="router-link"
            :to="{
              name: 'SignUp'
            }"
            type="is-primary"
            @click.native="$emit('close')"
          >
            Sign Up
          </ButtonDefault>
        </div>
        <!-- <div
          class="logged-out-buttons is-flex is-flex-direction-row"
          v-if="!isLoggedIn"
        >
          <ButtonDefault
            class="navbar__item m-3"
            tag="router-link"
            :to="{
              name: 'Login'
            }"
            @click.native="$emit('close')"
          >
            Login
          </ButtonDefault>

          <ButtonDefault
            class="navbar__item m-3"
            tag="router-link"
            :to="{
              name: 'SignUp'
            }"
            type="is-primary"
            @click.native="$emit('close')"
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
            class="navbar__item m-3"
            v-if="isLoggedIn"
            type="is-secondary"
            @click.native="handleLogout"
          >
            Logout
          </ButtonDefault>
        </div> -->
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
import Responsive from '@mixins/Responsive'

import { IImage } from '@/lib/types'

import ButtonDefault from '@atoms/ButtonDefault/button-default.vue'
import SwitchDefault from '@/components/atoms/Switch/switch-default.vue'
import Auth from '@mixins/Auth'

export default Auth.extend({
  name: 'navbar-default',
  mixins: [
    Auth,
    Responsive
  ],
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

  .account-label a {
    color: var(--primary-text-color);

    &:hover {
      color: var(--primary-text-color-flipped);
    }
  }

  @media (max-width: 992px) {
    .navbar-brand {
      width: 100%;
      @include flex($justify: space-between);
    }
  }
}

</style>
