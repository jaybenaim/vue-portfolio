<template>
  <div
    class="hero"
    :class="withNav ? 'is-fullheight-with-navbar' : ''"
  >
    <div class="hero-head">
      <div class="container">
        <h1 class="title">
          Jacob Benaim
        </h1>
      </div>
    </div>

    <div
      class="hero__inner-container"
      :style="setBackground"
    >
      <Particles
        class="hero__particles"
      />

      <slot name="body">
        <div class="hero-body hero__body">

          <slot name="title">

          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Responsive from '@mixins/Responsive'

import Particles from '@atoms/Particles/particles.vue'

export default Vue.extend({
  name: 'hero',
  mixins: [ Responsive ],
  props: {
    withNav: {
      type: Boolean,
      default: true
    },
    backgroundUrl: {
      type: String,
      default: 'https://imgur.com/SiFvM90'
    }
  },
  computed: {
    setBackground() {
      return `--background-url: url('${this.backgroundUrl}')`
    }
  },
  mounted() {
    // if (this.$el.querySelector('#particles-js')) {
    //   // this.initParticles()
    // }
  },
  methods: {
    initParticles() {
      console.log(window)
      // window.particlesJS.load('particles-js', 'particles.json', () => console.log('working'))
    }
  },
  components: {
    Particles
  }
})
</script>

<style lang="scss" scoped>
.hero {
  @include transition();

  h1 {
    color: var(--white);
    position: absolute;
    width: 100%;
    top: 100px;
    font-size: 52px;
  }

  &__particles {
    background-color: var(--black);
  }
}
</style>
