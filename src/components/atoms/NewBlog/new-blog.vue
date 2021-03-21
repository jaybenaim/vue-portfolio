<template>
  <div class="new-blog">
    <ButtonDefault
      rounded
      icon-right="plus"
      @click.native="isOpen = true"
    >
    </ButtonDefault>

    <ModalForm
      :isOpen="isOpen"
      @close="isOpen = false"
      @blog-added="$emit('blog-added')"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonDefault from '../ButtonDefault/button-default.vue'
import ModalForm from '@organisms/ModalForm/modal-form.vue'

export default Vue.extend({
  name: 'new-blog',
  props: {
    icon: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  components: {
    ButtonDefault,
    ModalForm
  }
})
</script>

<style lang="scss" scoped>

</style>
