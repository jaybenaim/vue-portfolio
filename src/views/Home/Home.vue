<template>
  <div>
    <section>
      <Hero />
    </section>

    <BlogSection />
  </div>
</template>

<script>

import Hero from '@organisms/Hero/hero.vue'
import BlogSection from '@sections/BlogSection/blog-section.vue'

export default {
  name: 'home',
  data() {
    return {
      open: false,
    }
  },
  components: {
    Hero,
    BlogSection
  }
}
</script>

<style>
.container {
  height: 300px;
  width: 100%;
}
</style>
