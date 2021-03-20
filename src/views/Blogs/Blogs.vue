<template>
  <section
    class="blogs section is-medium"
    v-if="isReady"
  >
    <h1 class="title">
      Blogs
    </h1>

    <ul
      class="blogs__list"
    >
      <li
        v-for="(blog, index) in blogs"
        :key="index"
      >
        <CardBlog :blog="blog" />
      </li>
    </ul>

    <div class="blogs__new-blog-button box">
      <NewBlog />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import { Blog } from '@/lib/types/Blog'
import CardBlog from '@organisms/Card/Blog/card-blog.vue'
import NewBlog from '@atoms/NewBlog/new-blog.vue'

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
    CardBlog,
    NewBlog
  }
})
</script>

<style lang="scss" scoped>
.blogs {
  .title {
    color: var(--primary-text-color);
  }

  &__new-blog-button {
    position: fixed;
    bottom: 25px;
    right: 50px;
  }
}
</style>
