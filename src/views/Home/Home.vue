<template>
  <div>
    <Hero />

    <Blogs />

    <About />

    <Contact />
  </div>
</template>

<script>

import Hero from '@organisms/Hero/hero.vue'
import Contact from '../Contact/Contact.vue'
import About from '../About/About.vue'
// import Blogs from '../Blogs/Blogs.vue'
// import BlogSection from '@sections/BlogSection/blog-section.vue'

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
    // Blogs
  }
}
</script>

<style>
.container {
  height: 300px;
  width: 100%;
}
</style>
