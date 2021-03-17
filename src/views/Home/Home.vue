<template>
  <section>
    <Hero />
  </section>
</template>

<script>

import Hero from '@organisms/Hero/hero.vue'

export default {
  name: 'home',
  data() {
    return {
      open: false,
    }
  },
  components: {
    Hero
  }
}
</script>

<style>
.fade-left-enter {
  color: blue;
}
</style>
