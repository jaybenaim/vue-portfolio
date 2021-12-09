<template>
  <div class="particles">
    <vue-particles
      class="particles-container"
      :class="className"
      v-bind="config"
      :key="cmpKey"
    />
  </div>
</template>

<script lang="ts">
import { Particles } from '@/lib/types/Particles'
import Theme from '@/mixins/Theme'

export default Theme.extend({
  name: 'particles',
  mixins: [Theme],
  props: {
    className: {
      type: String,
      default: 'particles-container'
    },
    color: {
      type: String,
      default: '#00f070'
    },
    particleOpacity: {
      type: Number,
      default: 0.7
    },
    particlesNumber: {
      type: Number,
      default: 75
    },
    particleSize: {
      type: Number,
      default: 4
    },
    shapeType: {
      type: String,
      default: 'circle'
    },
    linesColor: {
      type: String,
      default: '#ffffff'
    },
    linesWidth: {
      type: Number,
      default: 1
    },
    lineLinked: {
      type: Boolean,
      default: true
    },
    lineOpacity: {
      type: Number,
      default: 0.4
    },
    linesDistance: {
      type: Number,
      default: 150
    },
    moveSpeed: {
      type: Number,
      default: 3
    },
    hoverEffect: {
      type: Boolean,
      default: true
    },
    hoverMode: {
      type: String,
      default: 'grab'
    },
    clickEffect: {
      type: Boolean,
      default: true
    },
    clickMode: {
      type: String,
      default: 'push'
    }
  },
  data() {
    return {
      config: undefined as any,
      cmpKey: 0
    }
  },
  watch: {
    theme() {
      this.updateParticlesConfig()
    }
  },
  created() {
    this.config = new Particles(this.$props)
    this.updateParticlesConfig()
  },
  methods: {
    forceRerender() {
      this.cmpKey += 1
    },
    updateParticlesConfig() {
      const activeTheme = this.$store.getters.getTheme

      if (activeTheme === 'light') {
        this.config = new Particles({
          color: '#000000',
          linesColor: '#000000',
          clickEffect: false
        })
      }
      if (activeTheme === 'dark') {
        this.config = new Particles({
          color: '#00f070',
          linesColor: '#ffffff'
        })
      }

      this.forceRerender()
    }
  }
})
</script>

<style lang="scss">
  .particles-container {
    height: 100%;
  }

  canvas {
    min-height: 100%;
    position: relative;
    z-index: 5;
  }
</style>
