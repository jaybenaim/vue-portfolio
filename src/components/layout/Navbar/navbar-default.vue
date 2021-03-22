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
          class="logged-out-buttons"
          v-if="!isLoggedIn"
        >
          <b-navbar-item class="navbar__item">
            <ButtonDefault
              tag="router-link"
              :to="{
                name: 'Login'
              }"
              @click.native="$emit('close')"
            >
              Login
            </ButtonDefault>
          </b-navbar-item>

          <b-navbar-item class="navbar__item">
            <ButtonDefault
              tag="router-link"
              :to="{
                name: 'SignUp'
              }"
              type="is-primary"
              @click.native="$emit('close')"
            >
              Sign Up
            </ButtonDefault>
          </b-navbar-item>
        </div>

        <div class="navbar__is-logged-in is-flex is-flex-direction-row">
          <b-navbar-item
            class="navbar__item"
            v-if="isLoggedIn && user"
          >
            Signed in as, {{ user.username }}
          </b-navbar-item>

          <b-navbar-item>
            <ButtonDefault
              type="is-light"
              @click.native="handleLogout"
            >
              Logout
            </ButtonDefault>
          </b-navbar-item>
        </div>
      </div>

      <div class="navbar__dark-mode-toggle">
        <b-navbar-item
          tag="div"
          class="navbar__item"
          v-if="useDarkModeToggle"
        >
          <SwitchDefault />
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
    }
  },
  data() {
    return {
      isOpen: false,
      isLoggedIn: this.$store.getters.isLoggedIn,
      user: this.$store.getters.getUser
    }
  },
  watch: {
    '$store.getters.isLoggedIn': function watcher() {
      const isLoggedIn = this.$store.getters.isLoggedIn
      if (isLoggedIn) {
        this.$router.go(-1)
        this.$emit('close')
        this.isLoggedIn = isLoggedIn
        this.user = this.$store.getters.getUser
      }
    }
  },
  methods: {
    handleLogout() {
      // eslint-disable-next-line
      const auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(() => {
        console.log('User signed out.')
      })
      this.$store.commit('isLoggedIn', false)
    },
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
