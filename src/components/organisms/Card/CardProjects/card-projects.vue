<template>
  <CardBlank
    :includeElements="includeElements"
    class="card-projects"
  >
    <template #card-image>
      <ImageDefault
        v-bind="project.image"
        class="card-projects__image"
      />
    </template>

    <template #default>
      <h3 class="card-projects__title">
        <a
          :href="project.link"
          target="_blank"
        >
          {{ project.title }}
        </a>
      </h3>

      <p
        class="card-projects__description"
        v-html="project.description"
      />
    </template>

    <template #footer>
      <a
        class="mt-4"
        :href="project.link"
        target="_blank"
      >
        View Live
      </a>
    </template>
  </CardBlank>
</template>

<script lang="ts">
import Vue from 'vue'
import CardBlank from '../Blank/card-blank.vue'
import ImageDefault from '@atoms/Image/image-default.vue'

import { IncludeElements } from '@/lib/types/general/IncludeElements'
import { IProject } from '@/lib/types/models/Project'

export default Vue.extend({
  components: {
    CardBlank,
    ImageDefault
  },
  name: 'card-projects',
  props: {
    dataItem: {
      type: Object as () => IProject,
      required: true
    },
    includeElements: {
      type: Object as () => IncludeElements,
      default: () => (new IncludeElements({
        cardImage: {},
        content: {},
        footer: {}
      }))
    }
  },
  data() {
    return {
      project: {} as IProject
    }
  },
  created() {
    this.project = this.dataItem
  }
})
</script>

<style lang="scss">
.card-projects {
  background-color: rgba(var(--background-color-flipped-rgb), 0.15);

  a {
    color: var(--primary-text-color);

    &:hover {
      color: rgba(var(--primary-text-color-rgb), 0.85);
    }
  }

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
