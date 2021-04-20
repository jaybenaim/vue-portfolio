<template>
  <div class="project-section container">
    <div class="project-section__projects">
      <GalleryCard
        v-if="isReady"
        :items="projects"
      />
      <!-- <ul>
        <li
          v-for="(project, index) of projects"
          :key="index"
        >

        </li>
      </ul> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import GalleryCard from '@/components/organisms/Gallery/GalleryCard/gallery-card.vue'
import { $projects } from './assets/data/projects'
import { IGalleryItem } from '@/lib/types'

export default Vue.extend({
  name: 'project-section',
  components: {
    GalleryCard
  },
  computed: {

  },
  data() {
    return {
      projects: $projects as IGalleryItem[],
      isReady: false
    }
  },
  async created() {
    this.projects = $projects

    this.isReady = true
  },
  methods: {

  }
})
</script>

<style lang="scss">
.project-section {
  min-height: 482px;

}

</style>
