<template>
  <div class="card card-blank">
    <div
      v-if="includeElements.elements.cardImage"
      class="card-image"
    >
      <slot name="card-image">
      </slot>
    </div>

    <div class="card-content">
      <div
        v-if="includeElements.elements.media"
        class="media"
      >
        <slot name="media">
          <div class="media-left">
            <slot name="media-left"></slot>
          </div>

          <div class="media-content">
            <slot name="media-content"></slot>
          </div>
        </slot>
      </div>

      <div
        v-if="includeElements.elements.content"
        class="content"
      >
        <slot></slot>
      </div>
    </div>

    <div
      v-if="includeElements.elements.footer"
      class="card-footer ml-5 mr-5"
      :class="includeElements.elements.footer.className
        ? includeElements.elements.footer.className
        : ''
      "
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { IncludeElements } from '@/lib/types/general/IncludeElements'
import Vue from 'vue'

export default Vue.extend({
  name: 'card-blank',
  props: {
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => (new IncludeElements({
        cardImage: {},
        content: {}
      }))
    }
  }
})
</script>

<style lang="scss">
.card-image {
  overflow: hidden;
}

.card-image img {
  transition: transform .6s ease-in-out;
  object-fit: cover;
}

.card-image:hover img {
  transform: scale(1.04);
}
</style>
