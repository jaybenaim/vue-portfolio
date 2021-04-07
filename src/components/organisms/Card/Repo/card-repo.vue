<template>
  <div
    class="card card-repo"
    :style="`--delay: ${animationDelay / 5}s`"
  >
    <!-- <div class="card-image">
        <figure class="image is-64by64">
          <img
            src="https://bulma.io/images/placeholders/64x64.png"
            alt="Placeholder image"
          >
        </figure>
      </div> -->

    <div class="card-content">
      <div class="content">
        <Tooltip
          v-if="repo.name.length > maxTitleLength"
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
          <span v-html="repo.description"/>
        </div>

        <a :href="repo.htmlUrl">View on Github</a>

        <a href="#">#css</a>

        <a href="#">#responsive</a>

        <br>

        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Theme from '@/mixins/Theme'
import Tooltip from '@/components/atoms/Tooltip/tooltip.vue'

import { IGithubRepo } from '@/lib/types'
import { $truncate } from '@/helpers/text'

export default Theme.extend({
  components: { Tooltip },
  name: 'card-repo',
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
      default: 13
    }
  },
  methods: {
    truncate(text: string, length: number): string {
      return $truncate(text, length)
    }
  }
})
</script>

<style lang="scss">
$maxWidth: 250px;

.card-repo {
  width: $maxWidth;
  min-height: 340px;
  max-height: 340px;
  // overflow: auto;

  &__title {
    text-transform: capitalize;
  }

  &__content {
    // overflow-x: hidden;
  }

  &__description {
    // @include flex($wrap: wrap);
    // max-width: $maxWidth;
    // overflow: hidden;

  }

  .tooltip-content {
    background: rgba(var(--background-color-rgb), 0.8);
    color: var(--primary-text-color);
    font-size: 16px;
    text-transform: capitalize;
  }
}
</style>
