<template>
  <CardBlank
    class="card-repo"
    :style="`--delay: ${animationDelay}s`"
    :includeElements="includedElements"
  >
    <template
      v-if="repo.image"
      #card-image
    >
      <div class="p-2">
        <ImageDefault
          :src="repo.image.src"
          class="is-2by1"
          objectFit="contain"
        />
      </div>
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

    <div class="card-repo__created-at mt-4 mb-1">
      <time
        :datetime="formatDate(repo.createdAt)"
      >
        {{ formatDate(repo.createdAt) }}
      </time>
    </div>

    <template #footer>
      <LinkDefault
        class="card-repo__link pt-4"
        :link="getLink(repo.gitUrl)"
      >
        View on Github
      </LinkDefault>

      <LinkDefault
        class="card-repo__link pt-4"
        v-if="repo.homepageUrl"
        :link="getLink(repo.homepageUrl)"
      >
        View Live
      </LinkDefault>
    </template>
  </CardBlank>
</template>

<script lang="ts">
import Theme from '@/mixins/Theme'
import Tooltip from '@/components/atoms/Tooltip/tooltip.vue'

import { $truncate } from '@/helpers/text'
import CardBlank from '@organisms/Card/Blank/card-blank.vue'
import ImageDefault from '@/components/atoms/Image/image-default.vue'
import { $formatDate } from '@/helpers/date-time/date-time'
import { IGithubRepo } from '@/lib/types/models/Repo'
import LinkDefault from '@/components/atoms/Link/link-default.vue'
import { IncludeElements } from '@/lib/types/general/IncludeElements'
import Link from '@/lib/types/components/Link'

export default Theme.extend({
  name: 'card-repo',
  mixins: [Theme],
  components: {
    Tooltip,
    CardBlank,
    ImageDefault,
    LinkDefault
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
      default: 20
    }
  },
  data() {
    return {
      includedElements: undefined as any
    }
  },
  watch: {
    repo() {
      this.setIncludedElements()
    }
  },
  created() {
    this.setIncludedElements()
  },
  methods: {
    truncate(text: string, length: number): string {
      return $truncate(text, length)
    },
    formatDate(date: string): string {
      return $formatDate(new Date(date), 'MMMM Do YYYY')
    },
    getLink(href: string): Link {
      return new Link({
        href
      })
    },
    setIncludedElements() {
      this.includedElements = new IncludeElements({
        cardImage: {},
        content: {},
        footer: {
          className: this.repo.homepageUrl !== undefined
        ? 'is-justify-content-space-between'
        : 'is-justify-content-center'
        }
      })
    }
  }
})
</script>

<style lang="scss">
$maxWidth: 280px;

.card-repo {
  height: 100%;
  width: 323px;
  background-color: rgba(var(--background-color-flipped-rgb), 0.15);

  &, *, a, div, span, p {
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
