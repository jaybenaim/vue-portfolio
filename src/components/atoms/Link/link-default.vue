<template>
  <a
    class="link"
    :class="link.className"
    :href="link.href"
    :target="link.target"
    :rel="link.rel"
  >
    <slot>
      {{ link.linkText }}
    </slot>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import Link from '@/lib/types/components/Link'

export default Vue.extend({
  name: 'link-default',
  props: {
    link: {
      type: Object as () => Link
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
