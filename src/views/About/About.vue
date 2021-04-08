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

    <section class="section is-small">
      <div class="about__filters">
        <Tabs
          :tabs="tabList"
          @tab-selected="(filter) => handleFilterChange(filter)"
        >
          <div
            v-if="selectedFilter === 'Repos'"
            class="about__filter--content"
          >
            <RepoSection />
          </div>

          <div
            v-if="selectedFilter === 'Images'"
            class="about__filter--content"
          >
            Images
          </div>

          <div
            v-if="selectedFilter === 'Code Snippets'"
            class="about__filter--content"
          >
            Code Snippets
          </div>
        </Tabs>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tabs from '@atoms/Tabs/tabs.vue'

import { ITab } from '@/lib/types'
import RepoSection from './components/RepoSection/repo-section.vue'

export default Vue.extend({
  name: 'About',
  props: {
    title: {
      type: String,
      default: 'Where it all began...'
    },
  },
  components: {
    Tabs,
    RepoSection
  },
  data() {
    return {
      selectedFilter: 'Repos',
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

  &__filters {

    .tabs {
      flex-basis: 20%;
      overflow: hidden;
    }

    .tabs ul {
      border-bottom: none;
    }

    .tab-content {
      overflow: auto;
      flex-basis: 80%;
      padding: 2rem;
    }

    .tab-item {
      height: 100%;
      width: 100%;
    }
  }

  &__filter--content {
    @include animate($name: fade-in, $duration: 0.8s);
    height: 100%;
    width: 100%;
  }
}

</style>
