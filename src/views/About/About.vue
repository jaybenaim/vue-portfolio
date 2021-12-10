<template>
  <section class="about section is-small">
    <div
      class="about__title p-4"
      :class="isMobile ? 'mt-5 mb-4' : 'mt-6'"
    >
      <span
        class="letter"
        v-for="(letter, index) of title"
        :key="index"
        :style="`--delay: ${index / 10}s`"
      >
        {{ letter }}
      </span>
    </div>

    <div
      :class="!isMobile ? 'pt-5' : 'p-0'"
    >
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
    </div>
  </section>
</template>

<script lang="ts">
import Tabs from '@/components/atoms/Tabs/TabsDefault/tabs-default.vue'

import RepoSection from './components/RepoSection/repo-section.vue'
import ProjectSection from './components/ProjectSection/project-section.vue'

import { ITab } from '@/lib/types'
import { ITabProps } from '@/lib/types/components/tabs'
import SnippetSection from './components/SnippetSection/snippet-section.vue'
import Responsive from '@/mixins/Responsive'

export default Responsive.extend({
  name: 'About',
  mixins: [Responsive],
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
      tabList: [] as ITab[],
      tabProps: {} as ITabProps
    }
  },
  watch: {
    screen() {
      this.assignTabProps()
    }
  },
  created() {
    this.assignTabProps()
    this.setTabList()
  },
  methods: {
    handleFilterChange(filter: string) {
      this.selectedFilter = filter
    },
    assignTabProps() {
      this.tabProps = {
        vertical: !this.isMobile,
        destroyOnHide: true,
        expanded: true,
        animated: false,
        size: this.getTabSize(),
        multiline: this.isMobile
      } as ITabProps
    },
    getTabSize() {
      if (this.screen === 'sm-phone') {
        return 'is-small'
      } if (this.screen === 'phone' || this.screen === 'tablet') {
        return 'is-medium'
      }

      return 'is-large'
    },
    setTabList() {
      this.tabList = [{
        label: 'Projects',
        icon: {
          icon: 'presentation-play',
          size: this.getTabSize()
        }
      },
      {
        label: 'Repos',
        icon: {
          icon: 'folder-multiple-outline',
          size: this.getTabSize()
        }
      },
      {
        label: 'Code Snippets',
        icon: {
          icon: 'code-tags',
          size: this.getTabSize()
        }
      }] as ITab[]
    }
  }
})
</script>

<style lang="scss">
$minHeight: 580px;

.about {
  overflow-y: hidden;

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
    display: flex;
    justify-content: center;

    section.tab-content {
      min-height: $minHeight;
      padding: 0;
      overflow-x: hidden;
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
      @include b-radius();
    }

    &__side-filters,
    .tab-content {
      min-height: $minHeight;
    }

    // &, * {
    //   ::-webkit-scrollbar {
    //     height: 22px;
    //   }
    // }

    .tabs {
      flex-basis: 20%;
      overflow-x: hidden;

      @media (max-width: 993px) {
        margin-bottom: 1.5rem;
      }
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

        @media (max-width: 482px) {
          font-size: 18px;
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

      @media (max-width: 993px) {
        margin: 0 auto;
      }
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
