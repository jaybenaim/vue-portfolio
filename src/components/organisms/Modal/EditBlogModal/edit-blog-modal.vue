<template>
  <div class="modal-form">
    <!-- <ButtonDefault
      rounded
      icon-right="plus"
      @click.native="isOpen = true"
      class="is-large theme-colors"
    /> -->

    <BlogModal
      :isOpen.sync="isOpen"
      @close="isOpen = false"
      :editProps="editProps"
    />
  </div>
</template>

<script lang="ts">
import { IBlog } from '@/lib/types/models/Blog'
import Vue from 'vue'
import BlogModal from '@organisms/Modal/BlogModal/blog-modal.vue'

export default Vue.extend({
  props: {
    editProps: {
      type: Object as () => IBlog
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  components: {
    BlogModal

  }
})
</script>
<style lang="scss">

</style>
