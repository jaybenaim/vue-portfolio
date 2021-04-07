<template>
  <div class="about section is-small mt-5">
    <div class="about__title">
      <span
        class="letter"
        v-for="(letter, index) of title"
        :key="index"
        :style="`--delay: ${index / 10}s`"
      >
        {{ letter }}
      </span>
    </div>

    <div class="columns">

      <section class="section is-small column">
        <div class="about__filters">
          <Tabs
            :tabs="tabList"
            @tab-selected="(filter) => handleFilterChange(filter)"
          />
        </div>
      </section>

      <section class="section is-small column">
        <div v-if="selectedFilter === 'repos'">
          Repos
        </div>
      </section>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tabs from '@atoms/Tabs/tabs.vue'

import { ITab } from '@/lib/types'

export default Vue.extend({
  name: 'About',
  props: {
    title: {
      type: String,
      default: 'Where it all began...'
    },
  },
  components: {
    Tabs
  },
  data() {
    return {
      selectedFilter: 'repos',
      tabList: [
        {
          label: 'Repos',
          icon: 'folder-multiple-outline'
        },
        {
          label: 'Images',
          icon: 'image-search-outline'
        },
        {
          label: 'Code Snippets',
          icon: 'code-tags'
        }
      ] as ITab[]
    }
  },
  methods: {
    handleFilterChange(filter: string) {
      this.selectedFilter = filter
    }
  }
})
</script>

<style lang="scss">
.about {

  &__title {
    @include flex($justify: flex-start);
    font-size: 36px;

    .letter {
      @include animate($name: slide-right, $duration: 1.2s);
      @include animate($name: hand-drawn, $delay: var(--delay), $ease: ease-in, $duration: 1s);
      min-height: 56px;
    }
  }
}

</style>
