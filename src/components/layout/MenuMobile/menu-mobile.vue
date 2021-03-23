<template>
  <BSidebar
    :type="theme"
    :fullheight="fullheight"
    :fullwidth="fullwidth"
    :overlay="overlay"
    :right="right"
    :open="open"
    @close="$emit('close')"
    :on-cancel="() => $emit('close')"
    class="menu-mobile"
  >
    <div class="p-1">
      <BImage
        v-if="includeLogo"
        v-bind="logo"
      />

      <BMenu class="menu-mobile__menu">
        <BMenuList label="Menu">
          <BMenuItem
            label="Home"
            icon="home"
            tag="router-link"
            to="/"
            @click.native="$emit('close')"
            class="menu-mobile__link"
          />

          <BMenuItem
            label="Blogs"
            tag="router-link"
            to="/blogs"
            @click.native="$emit('close')"
            class="menu-mobile__link"
          />

          <BMenuItem
            label="About"
            tag="router-link"
            to="/about"
            @click.native="$emit('close')"
            class="menu-mobile__link"
          />

          <BMenuItem
            label="Contact"
            tag="router-link"
            to="/contact"
            @click.native="$emit('close')"
            class="menu-mobile__link menu-mobile__link__contact"
            icon="phone"
          />
        </BMenuList>
      </BMenu>
    </div>

    <div class="menu-mobile__auth p-4">
      <div
        class="logged-out-buttons"
        v-if="!isLoggedIn"
      >
        <ButtonDefault
          tag="router-link"
          to="/login"
          @click.native="$emit('close')"
          class="m-2 menu-item"
        >
          Login
        </ButtonDefault>

        <ButtonDefault
          tag="router-link"
          to="/sign-up"
          type="is-primary"
          @click.native="$emit('close')"
          class="m-2"
        >
          Sign Up
        </ButtonDefault>
      </div>

      <div class="menu-mobile__is-logged-in is-flex is-flex-direction-column">
        <div
          class="menu-mobile__item"
          v-if="isLoggedIn && user && showSignedInAs"
        >
          Signed in as, {{ user.username }}
        </div>

        <ButtonDefault
          v-if="isLoggedIn"
          :type="theme"
          @click.native="handleLogout"
          class="menu-mobile__item"
        >
          Logout
        </ButtonDefault>
      </div>
    </div>

    <div class="m-3 p-2">
      <SwitchDefault class="box is-flex is-justify-content-center theme-colors"/>
    </div>
  </BSidebar>
</template>

<script lang="ts">
import Vue from 'vue'
import { IImage } from '@lib/types'
import SwitchDefault from '@/components/atoms/Switch/switch-default.vue'
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'

export default Vue.extend({
  components: { SwitchDefault, ButtonDefault },
  name: 'menu-mobile',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    /**
     * Set the theme of the menu. Options: `is-light`, `is-dark`.
     */
    theme: {
      type: String,
      default: 'is-light',
      validator: (value: string) => [
        'is-white',
        'is-black',
        'is-light',
        'is-dark',
        'is-primary',
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ].indexOf(value) > -1
    },
    /**
     * Show an overlay on the rest of the page.
     */
    overlay: {
      type: Boolean,
      default: true
    },
    /**
     * Set the menu to the full view height.
     */
    fullheight: {
      type: Boolean,
      default: true
    },
    /**
     * Set the menu to take the full view width on open.
     * You must provide a way to close the menu or you have to refresh.
     */
    fullwidth: {
      type: Boolean,
      default: false
    },
    /**
     * Show the menu on the right side.
     */
    right: {
      type: Boolean,
      default: false
    },
    /*
     * Choose if you want a logo.
     */
    includeLogo: {
      type: Boolean,
      default: true
    },
   /**
    * Image object that contains the logo data.
    */
    logo: {
      type: Object as () => IImage,
      default: () => ({
        src: 'https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png',
        alt: 'Lightweight UI components for Vue.js based on Bulma'
      } as IImage)
    },
    showSignedInAs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoggedIn: this.$store.getters.isLoggedIn,
      user: this.$store.getters.getUser
    }
  },
  watch: {
    '$store.getters.isLoggedIn': function watcher() {
      const isLoggedIn = this.$store.getters.isLoggedIn
      if (isLoggedIn) {
        this.isLoggedIn = isLoggedIn
        this.user = this.$store.getters.getUser
      }
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
    }
  }
})
</script>

<style lang="scss">
.menu-mobile {

  .sidebar-content {
    @include theme();
  }

  &__link {
    @include themeLink();
  }

  .p-1 {
    padding: 1em;
  }

  @include scrollbar();
}
</style>
