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
                v-if="blog.uid && blog.uid.image"
                :src="blog.uid.image"
                alt="Author profile image"
              >

              <img
                v-else
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
          <ButtonDefault
            label="Edit"
            class="card-footer-item is-warning m-2"
            @click.native="handleEdit"
          />

          <ButtonDefault
            label="Delete"
            class="card-footer-item is-danger m-2"
            @click.native="handleDelete"
          />
        </footer>
      </div>
    </div>

    <div v-if="showEditModal">
      <BlogModal
        :isOpen.sync="showEditModal"
        @close="showEditModal = false"
        @blog-updated="$emit('blog-updated')"
        :editProps="blog"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import BlogModal from '@organisms/Modal/BlogModal/blog-modal.vue'

import { $formatDate } from '@/helpers/date-time/date-time'
import { IApiDeleteResponse } from '@/lib/types'
import { IBlog } from '@/lib/types/models/Blog'
import { IApiError } from '@/lib/types/errors'

export default Vue.extend({
  name: 'card-blog',
  components: {
    ButtonDefault,
    BlogModal
  },
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
      showFooter: false,
      showEditModal: false
    }
  },
  created() {
    if (this.includeFooter) {
      this.showFooter = this.checkUserId()
    }
  },
  methods: {
    formatDate(date: Date): string {
      return $formatDate(date)
    },
    checkUserId(): boolean {
      if (this.$store.getters.getUser.id === this.blog.uid?.id) {
        return true
      }

      return false
    },
    async handleEdit() {
      // const response: IApiBlogResponse | IApiBlogResponseError = await this.$store.dispatch('editBlog', this.blog.id, newBlog)
      // this.$emit('edit', this.blog)
      this.showEditModal = true
    },
    async handleDelete() {
      const response: IApiDeleteResponse | IApiError = await this.$store.dispatch('deleteBlog', this.blog.id)

      if (response.success) {
        this.$emit('blog-deleted-successfully')
      } else {
        this.$store.commit('error', {

          error: {
            name: 'UnknownError',
            message: 'Something went wrong'
          }
        } as IApiError)
      }
    }
  }
})
</script>

<style lang="scss">
.blog {

  * {
    overflow: hidden;
  }

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
