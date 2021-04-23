<template>
  <div class="container mt-6">
    <section
      class="blog-details section"
      v-if="Object.keys(currentBlog).length > 0"
    >
      <CardBlog
        :blog="currentBlog"
        :withRouterLink="false"
        :includeElements="includeElements"
        @blog-updated="getBlog"
      />
    </section>
  </div>
</template>

<script lang="ts">
import Auth from '@/mixins/Auth'

import CardBlog from '@/components/organisms/Card/Blog/card-blog.vue'
import { IApiBlogResponseError } from '@/lib/types/errors'
import { IncludeElements } from '@/lib/types/general/IncludeElements'
import { Blog, IApiBlogResponse } from '@/lib/types/models/Blog'

export default Auth.extend({
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
        summary: {},
        content: {},
        image: {},
        imageCaption: {},
        publishDate: {},
        tags: {},
        optionsToggle: {}
      })
    },
  },
  data() {
    return {
      currentBlog: {} as Blog,
    }
  },
  async created() {
    await this.getBlog()
  },
  methods: {
    async getBlog() {
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
  }
})
</script>

<style lang="scss">
.blog-details {

  .card {
    max-width: 1050px;
    margin: 0 auto;
  }

  .blog {
    &__image {
      height: 320px;
    }

    &__content {
      @include flex($dir: column, $justify: flex-start, $align: flex-start);

      * {
        min-height: 100%;
      }
    }
  }
}
</style>
