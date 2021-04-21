<template>
  <div class="gallery-list">
    <b-carousel-list
      v-if="loadedComponent !== undefined"
      :data="items"
      :items-to-show="galleryProps.itemsToShow"
      :repeat="galleryProps.repeat"
      :has-drag="galleryProps.hasDrag"
      :arrow="galleryProps.arrow"
      :arrow-hover="galleryProps.arrowHover"
    >
      <template #item="item">
        <component
          :is="loadedComponent"
          v-bind="getComponentData({item, includeElements})"
          :dataItem="item"
          @mousedown.native.stop
        >
          <slot></slot>
        </component>
      </template>
    </b-carousel-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IGalleryItem, IGalleryProps } from '@/lib/types'
import { IncludeElements } from '@/lib/types/general/IncludeElements'
import { DynamicComponent, IPropsObject } from '@/lib/types/general/DynamicComponent'

export default Vue.extend({
  name: 'gallery-list',
  props: {
    items: {
      type: Array as () => IGalleryItem[],
      required: true,
    },
    dynamicComponent: {
      type: Object as () => DynamicComponent,
      required: true,
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => (new IncludeElements({
        cardImage: {},
        content: {}
      }))
    },
    limit: {
      type: Number,
      default: 1
    },
    customGalleryProps: {
      type: Object as () => IGalleryProps
    }
  },
  data() {
    return {
      componentData: undefined as any,
      galleryProps: {
        itemsToShow: this.limit,
        repeat: true,
        hasDrag: true,
        arrow: this.items.length > this.limit,
        arrowHover: this.items.length > this.limit,
      } as IGalleryProps
    }
  },
  computed: {
    loadedComponent() {
      return this.dynamicComponent.import()
    },
  },
  created() {
    if (this.customGalleryProps) {
      this.galleryProps = this.customGalleryProps
    }

    this.componentData = this.dynamicComponent.getData()
  },
  methods: {
    getComponentData(dataToAdd: IPropsObject) {
      this.dynamicComponent.data = { ...dataToAdd, ...this.componentData }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
