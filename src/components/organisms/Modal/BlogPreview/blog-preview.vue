<template>
  <div class="blog-preview">
    <ModalDefault
      @close="$emit('close')"
    >
    </ModalDefault>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ModalDefault from '@organisms/Modal/ModalDefault/modal-default.vue'
import { Blog } from '@/lib/types/models/Blog'

export default Vue.extend({
  name: 'blog-preview',
  props: {
    blog: {
      type: Object as () => Blog,
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ModalDefault
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
}
</style>
