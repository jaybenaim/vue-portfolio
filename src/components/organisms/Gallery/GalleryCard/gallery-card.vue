<template>
  <div class="gallery-default">
    <b-carousel-list
      :data="items"
      :items-to-show="limit"
      repeat
      has-drag
      :arrow="items.length > limit"
      :arrow-hover="items.length > limit"
    >
      <template #item="item">
        <CardProjects
          :project="item"
          :includeElements="includeElements"
        />
      </template>
    </b-carousel-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CardProjects from '../../Card/CardProjects/card-projects.vue'

import { IGalleryItem } from '@/lib/types'
import { IncludeElements } from '@/lib/types/general/IncludeElements'

export default Vue.extend({
  components: { CardProjects },
  name: 'gallery-card',
  props: {
    items: {
      type: Array as () => IGalleryItem[],
      required: true,
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => (new IncludeElements({
        cardImage: {},
        content: {},
        footer: {}
      }))
    },
    limit: {
      type: Number,
      default: 1
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
