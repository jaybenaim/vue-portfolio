<template>
  <div class="account is-flex columns">
    <section class="account__info column is-half-desktop">
      <div class="section is-medium">
        <div class="media">
          <div class="media-left mb-5">
            <b-image
              v-if="formProps.image"
              :src="formProps.image"
              alt="profile image"
              rounded
              class="is-256x256"
            />

            <div v-else>
              <p class="image is-128x128">
                <b-skeleton
                  circle
                  width="128px"
                  height="128px"
                ></b-skeleton>
              </p>
            </div>
          </div>

          <div
            class="media-right is-flex is-align-items-flex-start"
          >
            <b-icon
              :type="`is-${theme === 'light' ? 'dark' : 'light'}`"
              class="edit-icon is-flex is-align-self-flex-start"
              icon="pencil"
              @click.native="toggleUploader"
            />

            <div
              v-if="!isDisabled.image"
              class="upload ml-3 is-flex is-align-items-flex-start"
            >
              <UploadDragAndDrop
                :showLabel="false"
                @uploaded="handleUpload"
                height="20px"
              />
            </div>
          </div>
        </div>

        <b-field grouped>
          <b-field>
            <template #label>
              <label for="username">
                Username
                <b-icon
                  :type="`is-${theme === 'light' ? 'dark' : 'light'}`"
                  class="edit-icon"
                  icon="pencil"
                  @click.native="handleEdit('username')"
                />
              </label>
            </template>

            <b-input
              v-if="user.username"
              type="name"
              v-model="formProps.username"
              :disabled="isDisabled.username"
            />

            <b-skeleton
              v-else
              width="40%"
              :animated="true"
              :active="loading"
              size="is-large"
            />
          </b-field>

          <b-field label="Email">
            <template #label>
              <label for="email">
                Email
                <b-icon
                  :type="`is-${theme === 'light' ? 'dark' : 'light'}`"
                  class="edit-icon"
                  icon="pencil"
                  @click.native="handleEdit('email')"
                />
              </label>
            </template>

            <b-input
              v-if="user.email"
              type="email"
              v-model="formProps.email"
              :disabled="isDisabled.email"
            />

            <b-skeleton
              v-else
              width="40%"
              :animated="true"
              :active="loading"
              size="is-large"
            />
          </b-field>
        </b-field>

        <ButtonDefault
          v-if="!isDisabled.username || !isDisabled.email || !isDisabled.image"
          @click.native="handleSave"
          classname="is-flex is-align-justify-content-flex-start is-success"
          class="save-button"
        >
          Save
        </ButtonDefault>
      </div>
    </section>

    <section class="section is-medium account__blogs column is-half-desktop">
      <h2 class="title">
        Blogs
      </h2>

      <div class="columns">
        <div
          v-for="(blog, index) of blogs"
          :key="index"
          class="column p-5 is-half-desktop"
        >
          <CardBlog
            :blog="blog"
            includeFooter
            @blog-updated="getBlogs"
            @blog-deleted-successfully="getBlogs"
            :includeElements="includedElements"
          />
        </div>
      </div>

    </section>
  </div>
</template>

<script lang="ts">
import Auth from '@mixins/Auth'

import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import { IApiError } from '@/lib/types/errors'
import { IApiUserUpdateResponse, IUser } from '@/lib/types/models/User'
import Theme from '@/mixins/Theme'
import UploadDragAndDrop from '@/components/organisms/input/UploadDragAndDrop/upload-drag-and-drop.vue'
import CardBlog from '@organisms/Card/Blog/card-blog.vue'

import { $urlToBase64 } from '@/helpers'
import { $getImage } from '@/helpers/api/getImage'
import { Blog, IApiBlogsResponse } from '@/lib/types/models/Blog'
import { IncludeElements } from '@/lib/types/general/IncludeElements'

export default Auth.extend(Theme).extend({
  components: {
    ButtonDefault,
    UploadDragAndDrop,
    CardBlog
  },
  name: 'account',
  data() {
    return {
      formProps: {
        username: '',
        email: '',
        image: ''
      },
      loading: true,
      isDisabled: {
        username: true,
        email: true,
        image: true
      },
      previewImage: '',
      blogs: [] as Blog[],
      includedElements: new IncludeElements({
        title: {},
        author: {},
        publishDate: {},
        preview: {}
      })
    }
  },
  async mounted() {
    this.formProps.username = this.user.username || ''
    this.formProps.email = this.user.email || ''
    this.formProps.image = this.user.image || ''

    if (this.user.id) {
      await this.getBlogs()
    }
  },
  methods: {
    toggleUploader() {
      this.isDisabled.image = !this.isDisabled.image
    },
    handleEdit(type: 'username' | 'email') {
      this.isDisabled[type] = false
    },
    async handleSave() {
      const updatedUserInfo = this.formProps as IUser

      const updatedProfile: IApiUserUpdateResponse | IApiError = await this.$store.dispatch('updateProfile', {
        id: this.user.id,
        ...updatedUserInfo
      })

      if (updatedProfile.success) {
        // this.$router.push({
        //   name: 'Account'
        // })
        // this.$router.go(0)

        console.log(updatedProfile)
      }
    },
    async handleUpload(file: File) {
      const base64String: string = await $urlToBase64(file) as string

      const imageUrl: string = await $getImage(base64String)

      this.formProps.image = imageUrl
    },
    async getBlogs() {
      const blogsResponse: IApiBlogsResponse = await this.$store.dispatch('getBlogsByUserId', this.user.id)

      if (blogsResponse.success) {
        this.blogs = blogsResponse.blogs
      }
    }
  }
})
</script>

<style lang="scss">
.account {
  label {
    text-align: left;
    color: var(--primary-text-color);
  }

  .edit-icon {
    &:hover {
      cursor: pointer;
    }
  }

  .save-button {
    color: var(--black);

    &:hover {
      color: rgba(var(--black-rgb), 0.8);
    }
  }

  &__info {
    .media {
      margin-top: 50px;

      .media-left {
        width: 50%;
      }
    }
  }

  // Blogs
  .title {
    color: var(--primary-text-color) !important;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .media,
    .field {
      justify-content: center;
    }
  }
}

</style>
