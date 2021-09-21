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
      </div>
    </slot>

    <slot name="body">
      <div class="hero-body hero__body">
        <h1 class="title">
          Jacob Benaim
        </h1>
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
        this.loadParticles = true
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
      text-shadow: -2px 20px 18px rgba(250, 247, 247, 0.3);
    }
  }

.hero {
  h1 {
    color: var(--primary-text-color);
    font-size: 52px;
    font-weight: 400;
    z-index: 6;
    opacity: 0;
    @include animate($name: text-pop-up-tr, $duration: 2s, $count: 1, $fill: forwards);
  }

  &__particles {
    background-color: var(--background-color);
    background-position: center;
    color: var(--primary-text-color);

    @media (max-width: 992px) {
      height: 110vh;
      width: 200vw;
    }
  }

  &__head {
    background: var(--background-url);
    position: absolute;
    width: 100%;
    height: 100%;

    @media (max-width: 992px) {
      width: 130vw;
      top: -110px;
      left: -110px;
      overflow-x: hidden;
    }
  }

  &__body {
    align-items: flex-end !important;

    @media (max-width: 992px) {
      position: relative;
      align-items: flex-end !important;
      padding: 0;
    }

    h1 {
      justify-content: flex-start;
      font-size: 2rem;

      @media (max-width: 992px) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
