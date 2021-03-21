<template>
  <div class="blog-details">
    details
  </div>
</template>

<script lang="ts">
import { $getBlogById } from '@/helpers/api/blogs'
import { Blog, IBlogApiResponse } from '@/lib/types/Blog'
import Vue from 'vue'

export default Vue.extend({
  name: 'blog-details',
  props: {
    blog: {
      type: Object as () => Blog
    },
    /**
     * Query Id from $route.
     */
    id: {
      type: String
    }
  },
  data() {
    return {
      currentBlog: {} as Blog
    }
  },
  async created() {
    const blog = this.$route.query as any

    if (!blog._id && Object.keys(this.currentBlog).length === 0 && !this.blog) {
      const blogId = this.id
      const blogResponse: IBlogApiResponse | undefined = await $getBlogById(blogId)

      if (blogResponse?._id) {
        this.currentBlog = new Blog(blogResponse)
      } else {
        this.$store.commit('error', 'Error getting the current blog.')
      }
    } else if (Object.keys(blog).length > 0) {
      this.currentBlog = new Blog(blog)
    } else {
      this.$store.commit('error', 'Error getting the current blog.')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
