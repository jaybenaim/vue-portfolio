<template>
  <div
    class="hero"
    :class="withNav ? 'is-fullheight-with-navbar' : ''"
    :data-theme="$store.getters.getTheme"
  >
    <slot name="head">
      <div class="hero-head hero__head">
        <Particles
          class="hero__particles"
        />

        <h1 class="title pl-5 ml-5">
          Jacob Benaim
        </h1>
      </div>
    </slot>

    <slot name="body">
      <div class="hero-body hero__body">
        <div class="box pl-5 ml-5">
          <ButtonDefault> Click me </ButtonDefault>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Responsive from '@mixins/Responsive'

import Particles from '@atoms/Particles/particles.vue'
import ButtonDefault from '@atoms/ButtonDefault/button-default.vue'

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
  components: {
    Particles,
    ButtonDefault
  }
})
</script>

<style lang="scss" scoped>
.hero {
  @include transition();

  h1 {
    color: var(--white);
    position: absolute;
    top: 100px;
    font-size: 52px;
    z-index: 6;
  }

  &__particles {
    background-color: var(--black);
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
