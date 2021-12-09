<template>
  <BImage
    class="image-default"
    v-bind="$attrs"
    :style="`--fit: ${objectFit}`"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'image-default',
  props: {
    objectFit: {
      type: String,
      default: 'cover'
    }
  }
})
</script>

<style lang="scss">
.image-default {
  img {
    object-fit: var(--fit);
  }
}
</style>
