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
  }
}

[title='Twitter'] {

  &:hover::after {
    // content: '';
    // @include animation(animate-twitter-icon 0.35s ease-in-out 1 forwards);
    // @include keyframes(animate-twitter-icon) {

    //   from {
    //     height: 0;
    //     width: 0;
    //     background: var(--white);
    //   }

    //   to {
    //     height: 85%;
    //     width: 85%;
    //     background: #1da1f2;
    //   }
    // }
  }
}

[title='Facebook'] {

  &:hover::after {
    // content: '';
    // @include animation(animate-facebook-icon 0.35s ease-in-out 1 forwards);
    // @include keyframes(animate-facebook-icon) {

    //   from {
    //     height: 0;
    //     width: 0;
    //     background: var(--white);
    //   }

    //   to {
    //     height: 85%;
    //     width: 85%;
    //     background: #1877f2;
    //   }
    // }
  }
}

[title='Instagram'] {

  &:hover::after {
    content: '';
    // @include animation(animate-instagram-icon 0.35s ease-in-out 1 forwards);
    // @include keyframes(animate-instagram-icon) {

    //   from {
    //     height: 0;
    //     width: 0;
    //     background: var(--white);
    //   }

    //   to {
    //     height: 85%;
    //     width: 85%;
    //     background: radial-gradient(circle at 30% 107%,
    //     #fdf497 0%,
    //     #fdf497 5%,
    //     #fd5949 45%,
    //     #d6249f 60%,
    //     #285aeb 90%);
    //   }
    // }
  }
}

[title='LinkedIn'] {

  &:hover::after {
    // content: '';
    // @include animation(animate-linkedin-icon 0.35s ease-in-out 1 forwards);
    // @include keyframes(animate-linkedin-icon) {

    //   from {
    //     height: 0;
    //     width: 0;
    //     background: var(--white);
    //   }

    //   to {
    //     height: 85%;
    //     width: 85%;
    //     background: #2867b2;
    //   }
    // }
  }
}

[title='YouTube'] {

  &:hover::after {
    // content: '';
    // @include animation(animate-youtube-icon 0.35s ease-in-out 1 forwards);
    // @include keyframes(animate-youtube-icon) {

    //   from {
    //     height: 0;
    //     width: 0;
    //     background: var(--white);
    //   }

    //   to {
    //     height: 85%;
    //     width: 85%;
    //     background: #ff0000;
    //   }
    // }
  }
}
</style>
