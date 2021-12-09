<template>
  <div class="social-links">
    <ul
      class="social-links__links"
    >
      <li
        v-for="(link, index) of socialLinks"
        :key="index"
      >
        <LinkDefault
          v-if="asIcons"
          :link="link.link"
        >
          <b-icon
            v-bind="link.icon"
            :custom-class="link.className"
          />
        </LinkDefault>

        <LinkDefault
          v-else
          :class="link.className"
          :link="link.link"
        >
          {{ link.label }}
        </LinkDefault>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ISocialLink } from '@/lib/types/components/socialLinks'

import LinkDefault from '@/components/atoms/Link/link-default.vue'

export default Vue.extend({
  name: 'social-links',
  components: {
    LinkDefault
  },
  props: {
    socialLinks: {
      type: Array as () => ISocialLink[],
      required: true,
    },
    asIcons: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss">
.social-links {
  &__links {
    @include flex();

    .icon {
      color: var(--primary-text-color);
    }

    .linked-in {

      &:hover {
        @include animate(
          $name: animate-linkedin-icon,
          $duration: 0.35s,
          $ease: ease-in-out,
          $count: 1,
          $fill: forwards
          );

        @keyframes animate-linkedin-icon {

          from {
            color: var(--primary-text-color);
          }

          to {
            color: #2867b2;
          }
        }
      }
    }

    .github {

      &:hover {
        @include animate(
          $name: animate-github-icon,
          $duration: 0.35s,
          $ease: ease-in-out,
          $count: 1,
          $fill: forwards
          );

        @keyframes animate-github-icon {

          from {
            color: var(--primary-text-color);
          }

          to {
            color: #bd2c00;
          }
        }
      }
    }
  }
}
</style>
