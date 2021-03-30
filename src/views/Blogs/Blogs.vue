<template>
  <section
    class="blogs section is-medium"
  >
    <h1 class="title">
      Blogs
    </h1>

    <ul class="blogs__list columns is-flex is-flex-wrap-wrap">
      <li
        v-for="(blog, index) in blogs"
        :key="index"
        class="column is-one-third-tablet is-one-quarter-desktop"
      >
        <CardBlog
          :blog="blog"
          :includeFooter="false"
          clickable
          @blog-updated="refreshBlogs"
          @blog-deleted="refreshBlogs"
          :animation="{
            delay: index
          }"
        />
      </li>
    </ul>

    <div
      v-if="isLoggedIn"
      class="blogs__new-blog-button"
    >
      <NewBlog
        @blog-added="refreshBlogs"
        :labelPosition="labelPos"
      />
    </div>
  </section>
</template>

<script lang="ts">

import { Blog } from '@/lib/types/models/Blog'
import CardBlog from '@organisms/Card/Blog/card-blog.vue'
import NewBlog from '@atoms/NewBlog/new-blog.vue'

import { $getBlogs } from '@/helpers/api/blogs'
import Auth from '@/mixins/Auth'

export default Auth.extend({
  name: 'blogs',
  mixins: [Auth],
  props: {
    labelPosition: {
      type: String,
      default: '',
      validator: (value: string) => [
        '',
        'inside',
        'on-border'
      ].indexOf(value) > -1
    }
  },
  data() {
    return {
      blogs: [] as Blog[],
      isReady: false,
      labelPos: this.labelPosition
    }
  },
  watch: {
    /// watch theme
    '$store.getters.getTheme': function watcher() {
      const theme = this.$store.getters.getTheme

      if (theme === 'dark') {
        this.labelPos = ''
      } else {
        this.labelPos = this.labelPosition
      }
    }
  },
  async created() {
    await this.getBlogs()
  },
  methods: {
    async getBlogs() {
      const blogs: void | Blog[] = await $getBlogs()

      this.blogs = blogs || []
      this.isReady = true
    },
    async refreshBlogs() {
      console.log('refresh')
      await this.getBlogs()
    }
  },
  components: {
    CardBlog,
    NewBlog
  }
})
</script>

<style lang="scss">
.blogs {
  .title {
    color: var(--primary-text-color);
  }

  &__new-blog-button {
    position: fixed;
    bottom: 25px;
    right: 25px;
  }

  .media-content {
    overflow: hidden;
  }
}
</style>
