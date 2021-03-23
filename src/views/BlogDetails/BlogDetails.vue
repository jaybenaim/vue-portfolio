<template>
  <div
    class="blog-details section is-large theme-colors mt-6"
    v-if="Object.keys(currentBlog).length > 0"
  >
    <CardBlog
      :blog="currentBlog"
      :withRouterLink="false"
    />
  </div>
</template>

<script lang="ts">
import CardBlog from '@/components/organisms/Card/Blog/card-blog.vue'
import { $getBlogById } from '@/helpers/api/blogs'
import { Blog, IBlogApiResponse } from '@/lib/types/models/Blog'
import Vue from 'vue'

export default Vue.extend({
  components: { CardBlog },
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

    if (!blog.id && Object.keys(this.currentBlog).length === 0 && !this.blog) {
      const blogId = this.id
      const blogResponse: IBlogApiResponse | undefined = await $getBlogById(blogId)

      if (blogResponse?.id) {
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
