<template>
  <div class="blog-preview">
    <ModalDefault
      @close="$emit('close')"
    >
      <template #header>
        <h2 class="modal__header--title">
          Preview
        </h2>
      </template>

      <CardBlog
        v-if="isOpen"
        :blog="blog"
        :includeElements="includeElements"
      />
    </ModalDefault>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ModalDefault from '@organisms/Modal/ModalDefault/modal-default.vue'

import { Blog } from '@/lib/types/models/Blog'
import { IncludeElements } from '@/lib/types/general/IncludeElements'

export default Vue.extend({
  name: 'blog-preview',
  props: {
    blog: {
      type: Object as () => Blog,
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => new IncludeElements({
        title: {},
        author: {},
        summary: {},
        content: {},
        image: {},
        imageCaption: {},
        publishDate: {},
        tags: {}
      })
    },
  },
  beforeCreate() {
    this.$options.components = this.$options.components || {}

    this.$options.components.CardBlog = require('@organisms/Card/Blog/card-blog.vue').default
  },
  components: {
    ModalDefault,
  }
})
</script>

<style lang="scss">
.blog-preview {
  .modal-background {
    position: absolute;
    z-index: 10;
  }

  .modal-content {
    position: relative;
    z-index: 11;
  }

  .modal {
    &__header--title {
      font-size: 24px;
    }
  }
}
</style>
