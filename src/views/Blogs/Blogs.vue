<template>
  <section class="blogs section is-large">
    <ul
      class="blogs__list"
      v-if="isReady"
    >
      <li
        v-for="(blog, index) in blogs"
        :key="index"
      >
        <CardBlog :blog="blog" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import { Blog } from '@/lib/types/Blog'
import CardBlog from '@organisms/Card/Blog/card-blog.vue'

import { $getBlogs } from '@/helpers/api/blogs'

export default Vue.extend({
  name: 'blogs',
  data() {
    return {
      blogs: {} as Blog[],
      isReady: false
    }
  },
  async created() {
    const blogs: Blog[] = await $getBlogs()

    if (Object.keys(blogs).length > 0) {
      this.blogs = blogs
      this.isReady = true
    }
  },
  components: {
    CardBlog
  }
})
</script>

<style lang="scss" scoped>

</style>
