<template>
  <section
    class="blog-details section is-large theme-colors mt-6"
    v-if="Object.keys(currentBlog).length > 0"
  >
    <CardBlog
      :blog="currentBlog"
      :withRouterLink="false"
    />
  </section>
</template>

<script lang="ts">
import CardBlog from '@/components/organisms/Card/Blog/card-blog.vue'
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
      const blogResponse: IApiBlogResponse | IApiBlogResponseError = await this.$store.dispatch('getBlogById', blogId)

      if (blogResponse.success) {
        this.currentBlog = blogResponse.blog
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
