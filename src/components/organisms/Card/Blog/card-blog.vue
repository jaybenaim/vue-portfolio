<template>
  <div class="blog">
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by1">
          <img
            :alt="blog.imageCaption"
            :src="blog.image"
          >
        </figure>
      </div>

      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              >
            </figure>
          </div>

          <div class="media-content">
            <p class="title is-4 blog__title">
              {{ blog.title }}
            </p>

            <p class="subtitle is-6 blog__author">
              By: {{ blog.author }}
            </p>
          </div>
        </div>

        <div class="content blog__content-container">
          <span
            v-html="blog.summary"
            class="blog__summary"
          />

          <time
            class="blog__publish-date"
            :datetime="blog.publishDate"
          >{{ formatDate(blog.publishDate) }}
          </time>
        </div>

        <footer
          class="card-footer"
          v-if="includeFooter"
        >
          <a
            href="#"
            class="card-footer-item"
          >Save</a>

          <a
            href="#"
            class="card-footer-item"
          >Edit</a>

          <a
            href="#"
            class="card-footer-item"
          >Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IBlog } from '@/lib/types/models/Blog'
import { $formatDate } from '@/helpers/date-time/date-time'

export default Vue.extend({
  name: 'card-blog',
  props: {
    blog: {
      type: Object as () => IBlog
    },
    includeFooter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatDate(date: Date): string {
      return $formatDate(date)
    }
  }
})
</script>

<style lang="scss" scoped>
.blog {
  &__title,
  &__author {
    text-align: left;
  }

  &__content-container {
    @include flex($dir: column);
  }

  &__summary {
    align-self: flex-start;
  }

  &__publish-date {
    align-self: flex-end;
  }
}
</style>
