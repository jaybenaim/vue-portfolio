<template>
  <div class="particles">
    <vue-particles
      class="particles-container"
      color="#00f070"
      :particleOpacity="0.7"
      :particlesNumber="75"
      shapeType="circle"
      :particleSize="4"
      linesColor="#ffffff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'particles'
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
