<template>
  <div class="snippet-section container">
    <div class="snippet-section__snippets">
      <GalleryList
        v-if="isReady"
        :items="snippets"
        :dynamicComponent="dynamicComponent"
        :customGalleryProps="galleryProps"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import GalleryList from '@organisms/Gallery/GalleryList/gallery-list.vue'
import CardSnippet from '@organisms/Card/CardSnippet/card-snippet.vue'

import { IGalleryProps, ISnippetItem } from '@/lib/types'
import { DynamicComponent } from '@/lib/types/general/DynamicComponent'
import { $snippets } from './assets/data/snippets'

export default Vue.extend({
  name: 'snippet-section',
  components: {
    GalleryList
  },
  data() {
    return {
      snippets: [] as ISnippetItem[],
      dynamicComponent: undefined as any,
      galleryProps: { } as IGalleryProps,
      limit: 1,
      isReady: false
    }
  },
  created() {
    this.dynamicComponent = new DynamicComponent(CardSnippet)

    this.init()

    this.galleryProps = {
      itemsToShow: this.limit,
      repeat: true,
      hasDrag: false,
      arrow: this.snippets.length > this.limit,
      arrowHover: this.snippets.length > this.limit,
    }
  },
  methods: {
    init() {
      this.snippets = $snippets

      this.isReady = true
    },

  }

})
</script>

<style lang="scss">
$coloredText: 22px;

[data-theme="dark"] {
  --alias:  #ffdd57;
  --option: #73b0f3;
  --name: var(--secondary);
}

[data-theme="light"] {
  --alias:  #b75501;
  --option: #114c8e;
  --name: #070707;
}

.snippet-section {
  min-height: 500px;

  .card-snippet {

    &__title {
      color: var(--primary-text-color);
    }

    &__description {
      text-align: left;
    }
  }

  &__snippets {

    .carousel-arrow {
      bottom: 50px;
      position: relative;
    }

    // Text container for snippet line
    .alias-snippet {

      &, * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    }

    .alias-heading {
      color: var(--primary-text-color);
    }

    .alias {
      color: var(--alias);
      font-size: $coloredText;

      &:after {
        content: ' '
      }
    }

    .alias-name {
      color: var(--name);
    }

    .alias-text {
      font-size: 18px;
      color: var(--primary-text-color);
    }

    .alias-option {
      color: var(--option);
      font-size: $coloredText;
    }
  }
}

</style>
