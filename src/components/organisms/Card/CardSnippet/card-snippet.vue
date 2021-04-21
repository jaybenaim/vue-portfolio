<template>
  <CardBlank
    :includeElements="includeElements"
    class="card-snippet"
  >
    <template #card-image>
      <ImageDefault
        v-bind="snippet.image"
        class="card-snippet__image"
      />
    </template>

    <template #default>
      <h2 class="card-snippet__title">
        {{ snippet.title }}
      </h2>

      <p
        class="card-snippet__description"
        v-html="snippet.content"
      />
    </template>
  </CardBlank>
</template>

<script lang="ts">
import Vue from 'vue'
import CardBlank from '../Blank/card-blank.vue'
import ImageDefault from '@atoms/Image/image-default.vue'

import { IncludeElements } from '@/lib/types/general/IncludeElements'
import { ISnippetItem } from '@/lib/types'

export default Vue.extend({
  components: {
    CardBlank,
    ImageDefault
  },
  name: 'card-snippet',
  props: {
    dataItem: {
      type: Object as () => ISnippetItem,
      required: true
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => (new IncludeElements({
        cardImage: {},
        content: {}
      }))
    }
  },
  data() {
    return {
      snippet: {} as ISnippetItem
    }
  },
  created() {
    if (this.dataItem) {
      this.snippet = this.dataItem
    }
  }
})
</script>

<style lang="scss">
.card-snippet {
  background-color: rgba(var(--background-color-flipped-rgb), 0.15);
  min-height: 500px;

  &__image img {
    max-height: 260px;
    object-fit: cover;
  }

  &__description {
    color: var(--primary-text-color);
  }

  .card-content .content {
    min-height: 120px;
  }
}
</style>
