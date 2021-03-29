<template>
  <div
    class="hero"
    :class="withNav ? 'is-fullheight-with-navbar' : ''"
  >
    <slot name="head">
      <div
        class="hero-head hero__head"
        :style="!useParticles && setBackground"
      >
        <Particles
          v-if="useParticles"
          class="hero__particles"
        />

        <h1 class="title pl-5 ml-5">
          Jacob Benaim
        </h1>
      </div>
    </slot>

    <slot name="body">
      <div class="hero-body hero__body">
      </div>
    </slot>
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
    background: {
      type: String,
      default: ''
    },
    useParticles: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setBackground() {
      return `--background-url: ${this.background}`
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
    color: var(--primary-text-color);
    position: absolute;
    top: 100px;
    font-size: 52px;
    z-index: 6;
  }

  &__particles {
    background-color: var(--background-color);
    color: var(--primary-text-color);
  }

  &__head {
    background: var(--background-url)
  }

  &__body {
    position: absolute;
    height: 100%;
    width: 100%;

    .button {
      position: relative;
      z-index: 6;
    }
  }
}
</style>
