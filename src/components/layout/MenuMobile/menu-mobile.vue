<template>
  <section>
    <b-sidebar
      :type="theme"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open="open"
      @close="$emit('close')"
    >
      <div class="p-1">
        <b-image
          v-if="includeLogo"
          v-bind="logo"
        />

        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item
              label="Home"
              icon="home"
              tag="router-link"
              to="/"
            ></b-menu-item>

            <b-menu-item
              label="Blogs"
              icon="feed"
              tag="router-link"
              to="/blogs"
            >
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script lang="ts">
import { Image } from '@lib/types'

export default {
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
      type: Object as () => Image,
      default: () => ({
        src: 'https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png',
        alt: 'Lightweight UI components for Vue.js based on Bulma'
      } as Image)
    }
  }
}
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
