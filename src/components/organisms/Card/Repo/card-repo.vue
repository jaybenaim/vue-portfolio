<template>
  <CardBlank
    class="card-repo"
    :style="`--delay: ${animationDelay}s`"
  >
    <template
      v-if="repo.image"
      #card-image
    >
      <ImageDefault
        :src="repo.image.src"
        class="is-2by1"
        objectFit="contain"
      />
    </template>

    <Tooltip
      v-if="repo.name && repo.name.length > maxTitleLength"
      :label="repo.name"
      position="is-bottom"
      type="default"
      multilined
    >
      <p class="title is-4 card-repo__title">
        {{ truncate(repo.name, maxTitleLength) }}
      </p>
    </Tooltip>

    <p
      v-else
      class="title is-4 card-repo__title"
    >
      {{ repo.name }}
    </p>

    <p class="subtitle is-6 card-repo__subtitle">
      {{ repo.language }}
    </p>

    <div class="card-repo__description">
      <p v-html="repo.description"/>
    </div>

    <a
      class="card-repo__link"
      :href="repo.htmlUrl"
      target="_blank"
    >
      View on Github
    </a>

    <div class="card-repo__created-at mt-4 mb-1">
      <time
        :datetime="formatDate(repo.createdAt)"
      >
        {{ formatDate(repo.createdAt) }}
      </time>
    </div>
  </CardBlank>
</template>

<script lang="ts">
import Theme from '@/mixins/Theme'
import Tooltip from '@/components/atoms/Tooltip/tooltip.vue'

import { IGithubRepo } from '@/lib/types'
import { $truncate } from '@/helpers/text'
import CardBlank from '@organisms/Card/Blank/card-blank.vue'
import ImageDefault from '@/components/atoms/Image/image-default.vue'
import { $formatDate } from '@/helpers/date-time/date-time'

export default Theme.extend({
  name: 'card-repo',
  mixins: [Theme],
  components: {
    Tooltip,
    CardBlank,
    ImageDefault
  },
  props: {
    repo: {
      type: Object as () => IGithubRepo,
      required: true
    },
    animationDelay: {
      type: Number,
      default: 0
    },
    maxTitleLength: {
      type: Number,
      default: 18
    }
  },
  methods: {
    truncate(text: string, length: number): string {
      return $truncate(text, length)
    },
    formatDate(date: string): string {
      return $formatDate(new Date(date), 'MMMM Do YYYY')
    }
  }
})
</script>

<style lang="scss">
$maxWidth: 250px;

.card-repo {
  height: 360px;
  background-color: rgba(var(--background-color-flipped-rgb), 0.15);

  &, *, a {
    color: var(--primary-text-color);
  }

  &__title {
    text-transform: capitalize;
  }

  &__description {
    p {
      width: $maxWidth;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .tooltip-content {
    background: rgba(var(--background-color-rgb), 0.8);
    color: var(--primary-text-color);
    font-size: 16px;
    text-transform: capitalize;
  }
}
</style>
