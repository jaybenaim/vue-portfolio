<template>
  <div class="card-repo">
    <div
      class="card"
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
        <Tooltip
          v-if="repo.name.length > maxTitleLength"
          :label="repo.name"
          position="is-bottom"
          type="default"
          multilined
        >
          <p class="title is-4">
            {{ truncate(repo.name, maxTitleLength) }}
          </p>
        </Tooltip>

        <p
          v-else
          class="title is-4"
        >
          {{ repo.name }}
        </p>

        <p class="subtitle is-6">
          {{ repo.language }}
        </p>

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
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
  data() {
    return {
      active: false
    }
  },
  methods: {
    truncate(text: string, length: number): string {
      console.log(text.substring(0, length))
      return $truncate(text, length)
    }
  }
})
</script>

<style lang="scss">
.card-repo {
  .card {
    max-width: 250px;
    min-height: 340px;
    max-height: 340px;

    .card-content {
      overflow-x: hidden;

      .title {
        text-transform: capitalize;
      }
    }

    .tooltip-content {
      background: rgba(var(--background-color-rgb), 0.8);
      color: var(--primary-text-color);
      font-size: 16px;
      text-transform: capitalize;
    }
  }
}
</style>
