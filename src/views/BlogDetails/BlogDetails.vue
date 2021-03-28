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
import { IApiBlogResponseError } from '@/lib/types/errors'
import { Blog, IApiBlogResponse } from '@/lib/types/models/Blog'
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

    if (!blog.id
    && !this.blog
    && Object.keys(this.currentBlog).length === 0
    ) {
      const blogId = this.id
      const blogResponse: IApiBlogResponse | IApiBlogResponseError = await $getBlogById(blogId)

      if (blogResponse.success) {
        this.currentBlog = new Blog(blogResponse.blog)
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
