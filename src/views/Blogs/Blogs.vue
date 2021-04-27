<template>
  <section
    class="blogs section is-small mt-5 pt-6"
  >
    <h1 class="title">
      Blogs
    </h1>

    <div
      v-if="!user || !user.isAuthenticated"
      class="subtitle p-3 primary-text"
    >
      Sign up to create a blog post. You can come back and edit it anytime!
    </div>

    <div
      v-else
      class="subtitle p-3 primary-text"
    >
      Have any cool tricks? Leave em below. You can come back and edit it anytime!
    </div>

    <div class="container pt-5">
      <ul class="blogs__list columns is-flex is-flex-wrap-wrap is-mobile">
        <li
          v-for="(blog, index) in blogs"
          :key="index"
          class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop"
        >
          <CardBlog
            :blog="blog"
            :includeFooter="false"
            clickable
            @blog-updated="refreshBlogs"
            @blog-deleted="refreshBlogs"
            :animation="{
              delay: index / 2
            }"
            :includeElements="includeElements"
          />
        </li>
      </ul>
    </div>

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
import { IncludeElements } from '@/lib/types/general/IncludeElements'

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
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => new IncludeElements({
        title: {},
        author: {},
        summary: {},
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
  computed: {
    isLoading(): boolean {
      return this.$store.getters.isLoading
    }
  },
  async created() {
    this.$store.commit('isLoading', true)

    await this.getBlogs()
  },
  methods: {
    async getBlogs() {
      const blogs: void | Blog[] = await $getBlogs()

      this.blogs = blogs || []
      this.isReady = true
      this.$store.commit('isLoading', false)
    },
    async refreshBlogs() {
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

  .blog {

    @media (min-width: 992px) {
      .card {
        @include animate($duration: .6s, $name: tilt-in-tr, $delay: var(--delay));
        opacity: 0;
      }
    }

    .media-content {
      overflow-x: hidden;
    }

    &__publish-date {
      justify-content: flex-start !important;
    }

    &__content,
    &__summary {
      span {
        @include truncate();
      }
    }
  }
}
</style>
