<template>
  <div class="project-section container">
    <div class="project-section__projects">
      <GalleryList
        v-if="isReady"
        :items="projects"
        :dynamicComponent="dynamicComponent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import GalleryList from '@/components/organisms/Gallery/GalleryList/gallery-list.vue'
import CardProjects from '@/components/organisms/Card/CardProjects/card-projects.vue'

import { $projects } from './assets/data/projects'
import { IGalleryItem } from '@/lib/types'
import { DynamicComponent } from '@/lib/types/general/DynamicComponent'

export default Vue.extend({
  name: 'project-section',
  components: {
    GalleryList
  },
  data() {
    return {
      projects: $projects as IGalleryItem[],
      dynamicComponent: undefined as any,
      isReady: false,
    }
  },
  created() {
    this.dynamicComponent = new DynamicComponent(CardProjects)

    this.projects = $projects

    this.isReady = true
  }
})
</script>

<style lang="scss">
.project-section {

  .carousel-arrow {
    position: relative;
    bottom: 40px;
  }

  .card-footer {
    padding-bottom: 40px;
    @include flex();
  }
}

</style>
