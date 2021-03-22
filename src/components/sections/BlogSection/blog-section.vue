<template>
  <section class="blog-section section is-large theme-colors">
    <h1 class="title">
      Blogs
    </h1>

    <div class="subtitle">
      Check out some of the published blogs or add one of your own.
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'blog-section'
})
</script>

<style lang="scss" scoped>
.blog-section {
  .title,
  .subtitle {
    color: var(--primary-text-color);
  }
}
</style>
