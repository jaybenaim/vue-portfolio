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
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardRepo from '@organisms/Card/Repo/card-repo.vue'

import { GithubData } from '@/helpers/github'
import { IGithubRepo, IGithubUser } from '@/lib/types'

export default Vue.extend({
  name: 'repo-section',
  components: {
    CardRepo
  },
  computed: {
    userData(): IGithubUser {
      return this.$store.getters.getUserInfo
    },
    repos(): IGithubRepo[] {
      return this.$store.getters.getRepos
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
}

</style>
