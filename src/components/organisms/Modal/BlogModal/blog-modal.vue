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
                {{ !editProps ? "New Post" : "Edit Post" }}
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
                :message="errors.content"
                :type="{ 'is-danger': errors.content }"
              >
                <b-input
                  v-model="formProps.content"
                  maxlength="5000"
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
                  class="preview__image m-5"
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
                class="mb-5"
                :label-position="labelPosition"
                @tags-updated="(currentTags) => formProps.tags = currentTags"
                :currentTags="formProps.tags"
              />

              <b-field label="Publish Date">
                <b-datepicker
                  v-model="formProps.publishDate"
                  inline
                />
              </b-field>
            </section>

            <footer class="modal-card-foot modal-card__footer p-3 mb-5 theme-colors">
              <ButtonDefault
                label="Close"
                @click.native="$emit('close')"
              />

              <ButtonDefault
                :label="!editProps ? 'Post' : 'Update'"
                class="button is-primary"
                @click.native="handleSubmit"
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

import {
  Blog,
  IApiBlogResponse, IBlog, IBlogUser
} from '@lib/types/models/Blog'

import Sortable from '@atoms/Sortable/sortable.vue'
import UploadDragAndDrop from '@organisms/input/UploadDragAndDrop/upload-drag-and-drop.vue'
import ButtonDefault from '@atoms/ButtonDefault/button-default.vue'

import { $getImage } from '@/helpers/api/getImage'
import {
 $createBlog
} from '@/helpers/api/blogs'
import { IApiBlogError, IApiBlogErrorType, IApiBlogResponseError } from '@/lib/types/errors'

import { $urlToBase64 } from '@/helpers'
import { IIndexedArray } from '@/lib/types'

export default Vue.extend({
  name: 'blog-modal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: '',
      validator: (value: string) => [
        '',
        'inside',
        'on-border'
      ].indexOf(value) > -1
    },
    editProps: {
      type: Object as () => IBlog
    }
  },
  data() {
    return {
      errors: {
        title: '',
        author: '',
        summary: '',
        content: '',
      } as IApiBlogError,
      formProps: {
        uid: {} as IBlogUser,
        title: '',
        author: '',
        summary: '',
        content: '',
        image: '',
        imageCaption: '',
        publishDate: new Date(),
        tags: [] as IIndexedArray[]
      } as IBlog
    }
  },
  created() {
    if (this.editProps) {
      this.formProps = new Blog(this.editProps)
    } else {
      const user = this.$store.getters.getUser
      const { username } = user

      this.formProps.uid = user
      this.formProps.author = username
    }
  },
  methods: {
    async handleFileUpload(file: File) {
      const base64String: string = await $urlToBase64(file) as string

      this.formProps.imageCaption = file.name

      const imageUrl: string = await $getImage(base64String)

      if (imageUrl) {
        this.formProps.image = imageUrl
      }
    },
    async handleSubmit() {
      if (!this.editProps) {
        const newBlogResponse: IApiBlogResponse | IApiBlogResponseError = await $createBlog(new Blog(this.formProps))

        const errors = !newBlogResponse.success ? newBlogResponse.error as IApiBlogError : undefined

        if (!errors) {
          this.$emit('close')
          this.$emit('blog-added')
          this.errors = {} as IApiBlogError
        } else if (errors) {
          for (const error of Object.keys(errors)) {
            this.errors[error as IApiBlogErrorType] = errors[error as IApiBlogErrorType]
          }
        }
      } else {
        const newBlogResponse: IApiBlogResponse | IApiBlogResponseError
        = await this.$store.dispatch('editBlog', new Blog(this.formProps))

        console.log(newBlogResponse)
        const errors = !newBlogResponse.success ? newBlogResponse.error as IApiBlogError : undefined

        if (!errors) {
          this.$emit('close')
          this.$emit('blog-updated')
          this.errors = {} as IApiBlogError
        } else if (errors) {
          for (const error of Object.keys(errors)) {
            this.errors[error as IApiBlogErrorType] = errors[error as IApiBlogErrorType]
          }
        }
      }
    }
  },
  components: {
    UploadDragAndDrop,
    Sortable,
    ButtonDefault
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

  .preview__image {
    height: 250px;
    width: 250px;
  }

  @media (max-width: 1200px) {
    .form {
    margin-top: 5rem !important;
    }
  }
}

</style>
