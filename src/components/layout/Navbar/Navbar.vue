<template>
  <BNavbar class="navbar">
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
      >
        Home
      </b-navbar-item>

      <b-navbar-item
        to="/blogs"
        tag="router-link"
      >
        Blogs
      </b-navbar-item>

      <b-navbar-item
        to="/about"
        tag="router-link"
      >
        About
      </b-navbar-item>

      <b-navbar-item
        to="/contact"
        tag="router-link"
      >
        Contact
      </b-navbar-item>
    </template>

    <template #end>
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
    </template>
  </BNavbar>
</template>

<script lang="ts">
import Vue from 'vue'

import { IImage } from '@/lib/types'
import ButtonDefault from '@atoms/ButtonDefault/button-default.vue'

export default Vue.extend({
  name: 'navbar',
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
    }
  },
  components: {
    ButtonDefault
  }
})
</script>

<style lang="scss" scoped>

</style>
