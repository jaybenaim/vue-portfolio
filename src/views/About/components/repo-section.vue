<template>
  <div class="repo-section">
    Repos
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { GithubData } from '@/helpers/github'
import { IGithubRepo, IGithubUser } from '@/lib/types'

export default Vue.extend({
  name: 'repo-section',
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

}

</style>
