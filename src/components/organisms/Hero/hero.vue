<template>
  <div
    class="hero"
    :class="withNav ? 'is-fullheight-with-navbar' : ''"
  >
    <slot name="head">
      <div
        class="hero-head hero__head"
        :style="!loadParticles && setBackground"
      >
        <Particles
          v-if="loadParticles"
          class="hero__particles"
        />

        <h1 class="title">
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
import Responsive from '@mixins/Responsive'

import Particles from '@atoms/Particles/particles.vue'
import Theme from '@/mixins/Theme'

export default Responsive.extend(Theme).extend({
  name: 'hero',
  mixins: [ Responsive, Theme ],
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
      default: true
    }
  },
  data() {
    return {
      loadParticles: false
    }
  },
  computed: {
    setBackground(): string {
      return `--background-url: ${this.background}`
    }
  },
  created() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      const route: Location = window.location

      if (route.host.includes('localhost')) {
        this.loadParticles = false
      } else {
        this.loadParticles = true
      }
    }
  },
  components: {
    Particles
  }
})
/* eslint-disable */
</script>

<style lang="scss">

 [data-theme="light"] {
   .hero h1 {
      text-shadow:0 1px 0 #ccc,0 2px 0 #ccc,0 3px 0 #ccc,0 4px 0 #ccc,0 5px 0 #ccc,0 6px 0 #ccc,0 7px 0 #ccc,0 8px 0 #ccc,0 9px 0 #ccc,0 50px 30px rgba(0,0,0,.3);
    }
  }

  [data-theme="dark"] {
   .hero h1 {
      text-shadow: -2px 45px 18px rgba(250, 247, 247, 0.3);
    }
  }

.hero {

  h1 {
    color: var(--primary-text-color);
    font-size: 52px;
    z-index: 6;
    @include animate($name: text-pop-up-tr, $duration: 2s, $count: 1, $fill: forwards); 
    opacity: 0;
    max-width: 80%; 
  }

  &__particles {
    background-color: var(--background-color);
    color: var(--primary-text-color);
  }

  &__head {
    background: var(--background-url)
  }
}
</style>
