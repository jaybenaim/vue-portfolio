<template>
  <section>
    <BSidebar
      :type="theme"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      :open="open"
      @close="$emit('close')"
    >
      <div class="p-1">
        <BImage
          v-if="includeLogo"
          v-bind="logo"
        />

        <BMenu>
          <BMenuList label="Menu">
            <BMenuItem
              label="Home"
              icon="home"
              tag="router-link"
              to="/"
              @click.native="$emit('close')"
            />

            <BMenuItem
              label="Blogs"
              tag="router-link"
              to="/blogs"
              @click.native="$emit('close')"
            />

            <BMenuItem
              label="About"
              tag="router-link"
              to="/about"
              @click.native="$emit('close')"
            />

            <BMenuItem
              label="Contact"
              icon="phone"
              tag="router-link"
              to="/contact"
              @click.native="$emit('close')"
            />
          </BMenuList>
        </BMenu>
      </div>
    </BSidebar>
  </section>
</template>

<script lang="ts">
import { IImage } from '@lib/types'

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
      type: Object as () => IImage,
      default: () => ({
        src: 'https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png',
        alt: 'Lightweight UI components for Vue.js based on Bulma'
      } as IImage)
    }
  }
}
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
