<template>
  <div class="about section is-small">
    <div class="about__title mt-6">
      <span
        class="letter"
        v-for="(letter, index) of title"
        :key="index"
        :style="`--delay: ${index / 10}s`"
      >
        {{ letter }}
      </span>
    </div>

    <section class="section pt-5">
      <div class="about__filters">
        <Tabs
          :tabs="tabList"
          @tab-selected="(filter) => handleFilterChange(filter)"
          :tabProps="tabProps"
          className="about-filters__side-filters"
        >
          <div
            v-if="selectedFilter === 'Projects'"
            class="about__filter--content"
          >
            <ProjectSection />
          </div>

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
            <SnippetSection />
          </div>
        </Tabs>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tabs from '@/components/atoms/Tabs/TabsDefault/tabs-default.vue'

import RepoSection from './components/RepoSection/repo-section.vue'
import ProjectSection from './components/ProjectSection/project-section.vue'

import { ITab } from '@/lib/types'
import { ITabProps } from '@/lib/types/components/tabs'
import SnippetSection from './components/SnippetSection/snippet-section.vue'

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
    RepoSection,
    ProjectSection,
    SnippetSection
  },
  data() {
    return {
      selectedFilter: 'Projects',
      tabList: [
        {
          label: 'Projects',
          icon: 'presentation-play'
        },
        {
          label: 'Repos',
          icon: 'folder-multiple-outline'
        },
        {
          label: 'Code Snippets',
          icon: 'code-tags'
        }
      ] as ITab[],
      tabProps: {
        vertical: true,
        destroyOnHide: true,
        expanded: true,
        animated: false,
        size: 'is-large'
      } as ITabProps
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
$minHeight: 550px;

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

  // Main Content
  &__filters {
    min-height: $minHeight;

    section.tab-content {
      min-height: $minHeight;
      padding: 0;
    }

    // Project Section
    .project-section,
    .project-section__projects,
    .repo-section,
    .snippet-section,
    .snippet-section__snippets,
    .gallery-list,
    .carousel-list,
    .carousel-slides,
    .card {
      height: 100%;
    }

    &__side-filters,
    .tab-content {
      min-height: $minHeight;
    }

    &, * {
      ::-webkit-scrollbar {
        height: 22px;
      }
    }

    .tabs {
      flex-basis: 20%;
      overflow-x: hidden;
    }

    .tabs ul {
      border-bottom: none;
    }

    .tabs {
      a {
        color: rgba(var(--primary-text-color-rgb), 0.4);
        border-bottom-color: rgba(var(--primary-text-color-rgb), 0.4);

        &:hover {
          color: rgba(var(--primary-text-color-rgb), 1);
          border-bottom-color: rgba(var(--primary-text-color-rgb), 1);
        }
      }

      // Active
      .is-active a {
        color: rgba(var(--primary-rgb), 1);
        border-bottom-color: rgba(var(--primary-rgb), 1);
      }
    }

    .tab-content {
      overflow: auto;
      overflow-y: hidden;
      flex-basis: 25%;
      margin: 0 5rem;
      min-height: 100%;
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
