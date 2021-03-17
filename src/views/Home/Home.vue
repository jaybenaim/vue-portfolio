<template>
  <div>
    <section>
      <Hero />
    </section>

    <section>
      <div class="container">
        adfsdfa
      </div>
    </section>
  </div>
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
.container {
  height: 300px;
  width: 100%;
}
</style>
