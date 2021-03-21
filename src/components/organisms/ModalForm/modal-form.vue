<template>
  <section class="modal-form">
    <b-modal
      :active="isOpen"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
      @close="$emit('close')"
    >
      <template>
        <form
          @submit.prevent
          class="form"
        >
          <div
            class="modal-card"
            style="width: auto"
          >
            <header class="modal-card-head modal-card__head theme-colors">
              <p class="modal-card-title">
                New Post
              </p>

              <button
                type="button"
                class="delete"
                @click="$emit('close')"
              />
            </header>

            <section class="modal-card-body modal-card__body theme-colors">
              <b-field
                label="Title"
                :label-position="labelPosition"
                :message="errors.title"
                :type="{ 'is-danger': errors.title }"
              >
                <b-input
                  v-model="formProps.title"
                  placeholder="Title"
                  required
                />
              </b-field>

              <b-field
                label="Author"
                :label-position="labelPosition"
                :message="errors.author"
                :type="{ 'is-danger': errors.author }"
              >
                <b-input
                  v-model="formProps.author"
                  placeholder="Your Name"
                  required
                />
              </b-field>

              <b-field
                label="Summary"
                :label-position="labelPosition"
                :message="errors.summary"
                :type="{ 'is-danger': errors.summary }"
              >
                <b-input
                  v-model="formProps.summary"
                  maxlength="200"
                  type="textarea"
                  placeholder="Summary"
                />
              </b-field>

              <b-field
                label="Content"
                :label-position="labelPosition"
                :message="errors.content"
                :type="{ 'is-danger': errors.content }"
              >
                <b-input
                  v-model="formProps.content"
                  maxlength="200"
                  type="textarea"
                  placeholder="Content"
                />
              </b-field>

              <div
                class="preview"
                v-if="formProps.image"
              >
                <span>Preview: </span>
                <img
                  :src="formProps.image"
                  class="preview__image"
                />
              </div>

              <UploadDragAndDrop
                :label-position="labelPosition"
                @uploaded="handleFileUpload"
              />

              <b-field
                label="Image Caption"
                :label-position="labelPosition"
              >
                <b-input
                  v-model="formProps.imageCaption"
                  placeholder="Image Caption"
                />
              </b-field>

              <Sortable
                :label-position="labelPosition"
                @tags-updated="(currentTags) => formProps.tags = currentTags"
              />

              <b-field label="Publish Date">
                <b-datepicker
                  v-model="formProps.publishDate"
                  inline
                />
              </b-field>
            </section>

            <footer class="modal-card-foot modal-card__footer p-3 mb-5 theme-colors">
              <b-button
                label="Close"
                @click="$emit('close')"
              />

              <b-button
                label="Post"
                type="is-primary"
                @click.prevent="handleSubmit"
              />
            </footer>
          </div>
        </form>
      </template>
    </b-modal>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import { Blog } from '@/lib/types/Blog'

import Sortable from '@/components/atoms/Sortable/sortable.vue'
import UploadDragAndDrop from '../input/UploadDragAndDrop/upload-drag-and-drop.vue'
import { $getImage } from '@/helpers/api/getImage'
import { $createBlog } from '@/helpers/api/blogs'

export default Vue.extend({
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'on-border',
      validator: (value: string) => [
        '',
        'inside',
        'on-border'
      ].indexOf(value) > -1
    }
  },
  data() {
    return {
      errors: {
        title: '',
        author: '',
        summary: '',
        content: '',
      },
      formProps: {
        title: '',
        author: '',
        summary: '',
        content: '',
        image: '',
        imageCaption: '',
        publishDate: new Date(),
        tags: undefined as any
      } as Blog
    }
  },
  methods: {
    toBase64(file: any) {
      const url = new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
      return url
    },
    async handleFileUpload(file: any) {
      const base64String: string = await this.toBase64(file) as string

      this.formProps.imageCaption = file.name

      const imageUrl: string = await $getImage(base64String)

      if (imageUrl) {
        this.formProps.image = imageUrl
      }
    },
    async handleSubmit() {
      const newBlogResponse = await $createBlog(this.formProps)

      const errors = newBlogResponse && newBlogResponse.data && newBlogResponse.data.errors

      if (!errors) {
        this.$emit('close')
        this.$emit('blog-added')
      } else if (errors) {
        for (const error of Object.keys(errors)) {
          this.errors[error as 'title' | 'author' | 'summary' | 'content'] = errors[error].message.replace('Path', '')
        }
      }
    }
  },
  components: {
    UploadDragAndDrop,
    Sortable
  }
})
</script>
<style lang="scss">
[data-theme="dark"] {
  .modal-card {
    &__head {
      border-top: 1px solid var(--primary-text-color);
      border-left: 1px solid var(--primary-text-color);
      border-right: 1px solid var(--primary-text-color);
      border-bottom: none;
    }

    &__body {
      border-left: 1px solid var(--primary-text-color);
      border-right: 1px solid var(--primary-text-color);
      border-bottom: none;
    }

    &__footer {
      border-bottom: 1px solid var(--primary-text-color);
      border-left: 1px solid var(--primary-text-color);
      border-right: 1px solid var(--primary-text-color);
      border-top: none;
    }
  }
}

.modal-form {

  .field:not(:last-child) {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .label {
    text-align: left;
    font-size: 18px !important;
    color: var(--primary-text-color);
  }

  .textarea {
    resize: none;
  }

  @media (max-width: 1200px) {
    .form {
    margin-top: 5rem !important;
    }
  }
}

</style>
