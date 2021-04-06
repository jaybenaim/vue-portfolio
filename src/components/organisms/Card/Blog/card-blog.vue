<template>
  <div
    class="blog"
    :style="`--delay: ${animation.delay / 3}s`"
  >
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
              <b-image
                v-if="blog.uid && blog.uid.image"
                :src="blog.uid.image"
                alt="Author profile image"
                rounded
              />

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
              <div class="blog__title pb-3">
                <router-link
                  v-if="clickable"
                  :to="{
                    name: 'BlogDetails',
                    params: {
                      blog,
                      id: blog.id
                    }
                  }"
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

                <div
                  v-if="includeElements.elements.optionsToggle"
                  class="blog__options-toggle"
                >
                  <b-dropdown
                    aria-role="list"
                    class="is-pulled-right"
                    position="is-bottom-left"
                  >
                    <template #trigger>
                      <b-icon icon="dots-vertical"></b-icon>
                    </template>

                    <span v-if="user.id === blog.uid.id">
                      <b-dropdown-item
                        aria-role="listitem"
                        @click.native="handleEdit"
                      >
                        Edit
                        <b-icon icon="lead-pencil"></b-icon>
                      </b-dropdown-item>

                      <b-dropdown-item
                        aria-role="listitem"
                        @click.native="handleDelete"
                      >
                        Delete
                        <b-icon icon="trash-can-outline"></b-icon>
                      </b-dropdown-item>
                    </span>

                    <span v-else>
                      <b-dropdown-item aria-role="listitem">
                        <b-icon
                          icon="heart-outline"
                          type="is-danger"
                        ></b-icon>
                      </b-dropdown-item>
                    </span>
                  </b-dropdown>
                </div>
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
            class="blog__summary is-flex mb-3"
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
            class="blog__bottom-section columns mt-3"
          >
            <div
              v-if="includeElements.elements.preview"
              class="blog__preview is-flex is-justify-self-flex-start column is-align-items-center"
              :class="(includeElements.elements.preview
                && includeElements.elements.publishDate)
                ? 'is-half' : 'is-full'"
            >
              <div v-if="includeElements.elements.preview.as === 'router-link'">
                <ButtonDefault
                  :to="{
                    name: 'BlogDetails',
                    params: {
                      blog,
                      id: blog.id,
                      includeElements: detailsEls
                    }
                  }"
                  tag="router-link"
                  label="Preview"
                />
              </div>

              <div v-if="includeElements.elements.preview.as === 'modal'">
                <ButtonDefault
                  label="Preview"
                  @click.native="previewIsOpen = !previewIsOpen"
                />
              </div>
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

    <BlogModal
      v-if="showEditModal"
      :isOpen.sync="showEditModal"
      @close="showEditModal = false"
      @blog-updated="$emit('blog-updated')"
      :editProps="blog"
    />

    <BlogPreview
      v-if="previewIsOpen"
      :blog="blog"
      :isOpen="previewIsOpen"
      @close="previewIsOpen = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import BlogModal from '@organisms/Modal/BlogModal/blog-modal.vue'
import BlogPreview from '../../Modal/BlogPreview/blog-preview.vue'

import { $formatDate } from '@/helpers/date-time/date-time'
import { IAnimation, IApiDeleteResponse } from '@/lib/types'
import { Blog } from '@/lib/types/models/Blog'
import { IncludeElements } from '@/lib/types/general/IncludeElements'
import { IApiError } from '@/lib/types/errors'

export default Vue.extend({
  name: 'card-blog',
  components: {
    ButtonDefault,
    BlogModal,
    BlogPreview
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
    },
    animation: {
      type: Object as () => IAnimation,
      default: () => ({
        name: 'rotate-vert-center',
        delay: '1s'
      })
    }
  },
  data() {
    return {
      showFooter: false,
      showEditModal: false,
      previewIsOpen: false,
      detailsEls: new IncludeElements({
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
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
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
      // console.log(this.blog.id)
      const response: IApiDeleteResponse | IApiError = await this.$store.dispatch('deleteBlog', this.blog.id)

      if (response.success) {
        this.$emit('blog-deleted')
      }
    }
  }
})
/* eslint-disable */
</script>


<style lang="scss">
@keyframes scale-up-ver-top {
  0% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }
}

@keyframes rotate-vert-center {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}


.blog {

  .card {
    background-color: rgba(var(--background-color-flipped-rgb), 0.15);
    @include animate($name: fade-in, $duration: 0.7s); 

    & { 
      position: relative;
      z-index: 1;
    }
  }

  p,
  .title,
  strong,
  &__summary,
  &__content,
  &__publish-date {
    color: var(--primary-text-color);
  }

  .card-image { 
    overflow: hidden; 
  }

  .card-image img { 
    transition: transform .5s ease-in-out;
    object-fit: cover;
  }

  .card-image:hover img { 
    transform: scale(1.1); 
  }

  .title { 
    &:hover {
      color: var(--primary-text-color-hover) !important;
    }
  }

  &__title { 
    @include flex($justify: space-between, $align: flex-start); 
  }

  &__options-toggle { 
    color: var(--primary-text-color); 

    &:hover { 
      color: var(--primary-text-color-hover); 
    }

    .dropdown-menu { 
      min-width: 100%; 

      .dropdown-item { 
        text-align: right;
        padding: 0 1em; 
      }
    }
  }

  &__title,
  &__author {
    text-align: left;
  }

  &__summary {
    text-align: left; 
  }

  &__content {
    text-align: left;
    max-height: 400px;
    overflow-y: auto;
 
    span { 
     @include truncate(); 
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
}
</style>
