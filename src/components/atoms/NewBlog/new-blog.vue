<template>
  <div class="new-blog">
    <ButtonDefault
      rounded
      icon-right="plus"
      @click.native="isOpen = true"
      class="is-large theme-colors"
    />

    <BlogModal
      :isOpen="isOpen"
      @close="isOpen = false"
      @blog-added="$emit('blog-added')"
      :labelPosition="labelPosition"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonDefault from '../ButtonDefault/button-default.vue'
import BlogModal from '@organisms/Modal/BlogModal/blog-modal.vue'

export default Vue.extend({
  name: 'new-blog',
  props: {
    icon: {
      type: String,
      default: 'add'
    },
    labelPosition: {
      type: String,
      default: '',
      validator: (value: string) => [
        '',
        'inside',
        'on-border'
      ].indexOf(value) > -1
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  components: {
    ButtonDefault,
    BlogModal
  }
})
</script>

<style lang="scss" scoped>

</style>
