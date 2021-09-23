<template>
  <div class="home">
    <Hero />

    <About />

    <Contact />
  </div>
</template>

<script>

import Hero from '@organisms/Hero/hero.vue'
import Contact from '../Contact/Contact.vue'
import About from '../About/About.vue'

export default {
  name: 'home',
  data() {
    return {
      open: false,
    }
  },
  components: {
    Hero,
    Contact,
    About,
  }
}
</script>

<style lang="scss">
.container {
  height: 300px;
  width: 100%;
}

.home {

  .about-filters__side-filters {
    @media (min-width: 768px) {
      padding-left: 4em;
    }
  }

  .contact .title {
    font-size: 3em;
    font-weight: 300;
  }
}
</style>
