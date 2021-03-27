<template>
  <div class="blog">
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by1">
          <router-link
            v-if="clickable"
            :to="{
              path: `${blog.id}`,
              query: blog
            }"
            append
          >
            <img
              :alt="blog.imageCaption"
              :src="blog.image"
            >
          </router-link>

          <span v-else>
            <img
              :alt="blog.imageCaption"
              :src="blog.image"
            >
          </span>
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
              <router-link
                v-if="clickable"
                :to="{
                  path: `${blog.id}`,
                  query: blog
                }"
                append
              >
                {{ blog.title }}
              </router-link>

              <span
                v-else
              >
                {{ blog.title }}
              </span>
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
          v-if="showFooter"
        >
          <a
            href="#"
            class="card-footer-item"
            @click="handleEdit"
          >Edit</a>

          <a
            href="#"
            class="card-footer-item"
            @click="handleDelete"
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
import { IApiDeleteResponse } from '@/lib/types'
import { IApiError } from '@/lib/types/errors'

export default Vue.extend({
  name: 'card-blog',
  props: {
    blog: {
      type: Object as () => IBlog
    },
    includeFooter: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFooter: false
    }
  },
  created() {
    if (this.includeFooter) this.checkUserId()
  },
  methods: {
    formatDate(date: Date): string {
      return $formatDate(date)
    },
    checkUserId() {
      if (this.$store.getters.getUser.id === this.blog.uid) {
        this.showFooter = true
      }
    },
    handleEdit() {

    },
    async handleDelete() {
      const response: IApiDeleteResponse | IApiError = await this.$store.dispatch('deleteBlog', this.blog.id)

      console.log(response)
      if (response.success) {
        console.log('Success')
        this.$emit('blog-deleted-successfully')
      } else {
        console.log('error')
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.blog {
  p {
    color: var(--black) !important;
  }

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
