<template>
  <BSidebar
    :type="`is-${theme}`"
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
          />

          <b-menu-list
            v-if="withAuth"
            class="menu-mobile__auth p-4"
          >
            <b-menu-list v-if="isLoggedIn">
              <b-menu-item
                class="account-label"
                :expanded.sync="showAccountDropdown"
                icon="account-cog"
              >
                <template #label>
                  Account
                  <b-icon
                    class="is-pulled-right"
                    :icon="showAccountDropdown ? 'menu-up' : 'menu-down'"
                  ></b-icon>
                </template>

                <BMenuItem
                  label="Account Details"
                  class="dropdown__item"
                  tag="router-link"
                  to="/account"
                  @click.native="$emit('close')"
                  icon="cogs"
                />

                <BMenuItem
                  v-if="isLoggedIn && user && showSignedInAs"
                  :label="`Signed in as, ${user.username}`"
                  class="dropdown__item pl-3 mt-3"
                  disabled
                />

                <ButtonDefault
                  class="dropdown__item m-3"
                  v-if="isLoggedIn"
                  type="is-secondary"
                  @click.native="handleLogout"
                >
                  Logout
                </ButtonDefault>
              </b-menu-item>
            </b-menu-list>

            <div
              v-else
              class="logged-out-buttons is-flex is-flex-direction-row is-align-items-center"
            >
              <ButtonDefault
                class="dropdown__item m-3 login-btn"
                tag="router-link"
                :to="{
                  name: 'Login'
                }"
                @click.native="$emit('close')"
              >
                Login
              </ButtonDefault>

              <ButtonDefault
                class="dropdown__item m-3"
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
          </b-menu-list>
        </BMenuList>
      </BMenu>
    </div>

    <div class="m-3 p-2">
      <SwitchDefault class="box is-flex is-justify-content-center theme-colors"/>
    </div>
  </BSidebar>
</template>

<script lang="ts">
import { IImage } from '@lib/types'
import SwitchDefault from '@/components/atoms/Switch/switch-default.vue'
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import Auth from '@/mixins/Auth'

export default Auth.extend({
  components: { SwitchDefault, ButtonDefault },
  mixins: [Auth],
  name: 'menu-mobile',
  props: {
    open: {
      type: Boolean,
      default: false
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
      default: true
    },
    withAuth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showAccountDropdown: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.showAccountDropdown = !this.showAccountDropdown
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

.menu-list {
  a {
    color: var(--primary-text-color);
  }
}
}
</style>
