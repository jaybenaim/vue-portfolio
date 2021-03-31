<template>
  <section
    class="blog-details section is-medium"
    v-if="Object.keys(currentBlog).length > 0"
  >
    <CardBlog
      :blog="currentBlog"
      :withRouterLink="false"
      :includeElements="includeElements"
    />
  </section>
</template>

<script lang="ts">
import CardBlog from '@/components/organisms/Card/Blog/card-blog.vue'
import { IApiBlogResponseError } from '@/lib/types/errors'
import { IncludeElements } from '@/lib/types/general/IncludeElements'
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
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => new IncludeElements({
        title: {},
        author: {},
        authorImage: {},
        summary: {},
        content: {},
        image: {},
        imageCaption: {},
        publishDate: {},
        tags: {}
      })
    },
  },
  data() {
    return {
      currentBlog: {} as Blog,
    }
  },
  async created() {
    const blogId = this.$route.params.id

    if (this.blog) {
      this.currentBlog = this.blog
    } else {
      const blogResponse: IApiBlogResponse | IApiBlogResponseError = await this.$store.dispatch('getBlogById', blogId)

      if (blogResponse.success) {
        this.currentBlog = blogResponse.blog
      }
    }
  }
})
</script>

<style lang="scss">
.blog-details {

  .card {
    max-width: 550px;
    margin: 0 auto;
  }
}
</style>
