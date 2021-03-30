<template>
  <div class="blog">
    <div class="card">
      <div
        v-if="includeElements.elements.image"
        class="blog__image card-image"
      >
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
          <div
            v-if="includeElements.elements.authorImage"
            class="media-left"
          >
            <figure class="image is-64x64">
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
            <div
              v-if="includeElements.elements.title"
              class="media-content__details"
            >
              <div class="blog__title">
                <router-link
                  v-if="clickable"
                  :to="{
                    path: `${blog.id}`,
                    query: blog
                  }"
                  append
                  class="title"
                >
                  {{ blog.title }}
                </router-link>

                <span
                  v-else
                  class="title"
                >
                  {{ blog.title }}
                </span>
              </div>
            </div>

            <div
              v-if="includeElements.elements.author"
              class="blog__author"
            >
              <p class="subtitle is-6">
                By: {{ blog.author }}
              </p>
            </div>

            <div
              v-if="includeElements.elements.tags"
              class="blog__tags mt-4 mb-4"
            >
              <b-taglist>
                <b-tag
                  type="is-info is-light"
                  v-for="(tag, index) of blog.tags"
                  :key="index"
                >
                  {{ tag }}
                </b-tag>
              </b-taglist>
            </div>
          </div>

        </div>

        <div class="content">
          <div
            v-if="includeElements.elements.summary"
            class="blog__summary is-flex"
          >
            <span
              v-html="blog.summary"
            />
          </div>

          <div
            class="blog__content is-flex"
            v-if="includeElements.elements.content"
          >
            <span
              v-html="blog.content"
            />
          </div>

          <div
            class="blog__bottom-section columns mt-4"
          >
            <div
              v-if="includeElements.elements.preview"
              class="blog__preview is-flex is-justify-self-flex-start column is-align-items-center"
              :class="(includeElements.elements.preview
                && includeElements.elements.publishDate)
                ? 'is-half' : 'is-full'"
            >
              <ButtonDefault
                :to="{
                  path: `blogs/${blog.id}`,
                  query: blog
                }"
                tag="router-link"
                label="Preview"
              />
            </div>

            <div
              v-if="includeElements.elements.publishDate"
              class="blog__publish-date is-flex is-justify-content-flex-end column"
              :class="(includeElements.elements.preview
                && includeElements.elements.publishDate)
                ? 'is-half' : 'is-full mr-3 mt-4'"
            >
              <time
                :datetime="blog.publishDate"
              >{{ formatDate(blog.publishDate) }}
              </time>
            </div>
          </div>
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
import { Blog } from '@/lib/types/models/Blog'
import { IApiError } from '@/lib/types/errors'
import { IncludeElements } from '@/lib/types/general/IncludeElements'

export default Vue.extend({
  name: 'card-blog',
  components: {
    ButtonDefault,
    BlogModal
  },
  props: {
    blog: {
      type: Object as () => Blog
    },
    includeFooter: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => new IncludeElements({
        title: {},
        author: {},
        authorImage: {},
        content: {},
        summary: {},
        image: {},
        imageCaption: {},
        publishDate: {},
        tags: {}
      })
    },
    includeTagList: {
      type: Boolean,
      default: true
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
      this.showEditModal = true
    },
    async handleDelete() {
      const response: IApiDeleteResponse | IApiError = await this.$store.dispatch('deleteBlog', this.blog.id)

      if (response.success) {
        this.$emit('blog-deleted')
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

  .card {
    background-color: rgba(var(--background-color-flipped-rgb), 0.15);
  }

  p,
  .title,
  strong,
  &__summary,
  &__content,
  &__publish-date {
    color: var(--primary-text-color);

    &:hover {
      color: var(--primary-text-color-hover) !important;
    }
  }

  &__title,
  &__author {
    text-align: left;
    overflow: hidden;
  }

  &__summary-container {
    @include flex($dir: column);
  }

  &__content {
    text-align: left;
    max-height: 400px;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
}
</style>
