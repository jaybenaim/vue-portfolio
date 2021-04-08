<template>
  <div class="repo-section">
    <ul class="repo-section__repos columns">
      <li
        v-for="(repo, index) in repos"
        :key="index"
        class="repo-section__repo column"
      >
        <CardRepo
          :repo="repo"
          :animationDelay="index"
        />
      </li>

      <li
        v-if="showLoadMore"
        class="repo-section__load-more"
      >
        <ButtonDefault
          icon-left="arrow-right-bold-outline"
          size="is-large"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardRepo from '@organisms/Card/Repo/card-repo.vue'

import { GithubData } from '@/helpers/github'
import { IGithubRepo, IGithubUser } from '@/lib/types'
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'

export default Vue.extend({
  name: 'repo-section',
  components: {
    CardRepo,
    ButtonDefault
  },
  computed: {
    userData(): IGithubUser {
      return this.$store.getters.getUserInfo
    },
    repos(): IGithubRepo[] {
      return this.$store.getters.getRepos
    },
    showLoadMore(): boolean {
      return this.userData.publicRepos > this.repos.length
    }
  },
  async created() {
    if (this.repos.length < 1) {
      await new GithubData().init()
    }
  }
})
</script>

<style lang="scss">
.repo-section {

  .card-repo {
    @include animate($name: tilt-in-tr, $duration: 1.5s, $delay: var(--delay));
    opacity: 0;
    margin: 0 20px;

    &:first-of-type {
      margin-left: 0;
    }
  }

  &__load-more {
    @include animate($name: fade-in, $duration: 1.5s, $delay: 1s);
    opacity: 0;

    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(var(--primary-text-color-rgb), 0.5);

      .icon {
        @include transform(scale(1.05) translateX(2px));
      }
    }
  }
}

</style>
