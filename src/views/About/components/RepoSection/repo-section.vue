<template>
  <div class="repo-section">
    <FilterDefault
      :filterData="filters"
      :tabProps="tabProps"
    >

    </FilterDefault>

    <ul class="repo-section__repos columns">
      <li
        v-for="(repo, index) in repos"
        :key="index"
        class="repo-section__repo column"
      >
        <CardRepo
          :repo="repo"
          :animationDelay="getAnimationDelay(index)"
        />
      </li>

      <li
        v-if="showLoadMore"
        class="repo-section__load-more"
      >
        <ButtonDefault
          icon-left="arrow-right-bold-outline"
          size="is-large"
          :type="`is-${theme}`"
          @clicked="loadMore"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import CardRepo from '@organisms/Card/Repo/card-repo.vue'

import { GithubData } from '@/helpers/github'
import { IGithubRepo, IGithubUser } from '@/lib/types'
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import Theme from '@/mixins/Theme'
import FilterDefault from '@/components/organisms/Filter/filter-default.vue'
import Responsive from '@/mixins/Responsive'
import { FilterData } from '@/lib/types/general/FilterList'
import { ITabProps } from '@/lib/types/components/tabs'

export default Responsive.extend(Theme).extend({
  name: 'repo-section',
  mixins: [Theme, Responsive],
  components: {
    CardRepo,
    ButtonDefault,
    FilterDefault
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
  data() {
    return {
      githubData: {} as GithubData,
      filters: new FilterData(),
      tabProps: {} as ITabProps
    }
  },
  async created() {
    if (this.repos.length < 1) {
      this.githubData = await new GithubData().init()
    }

    this.filters.filters = [
      {
        name: 'Recent',
        label: 'Recent',
        icon: 'history'
      },
      {
        name: 'Favourites',
        label: 'Favourites',
        icon: 'heart-outline'

      },
      {
        name: 'Deployed',
        label: 'Deployed',
        icon: 'rocket-launch-outline'

      }
    ]

    this.tabProps = {
      vertical: false,
      expanded: true,
      type: this.isMobile ? 'is-toggle-rounded' : 'is-boxed',
      destroyOnHide: false
    } as ITabProps
  },
  methods: {
    async loadMore() {
      await this.githubData.getRepos(this.repos.length)
    },
    getAnimationDelay(index: number): number {
      if (index % 30 === 0) {
        return 0
      }

      if (index > 30) {
        return (Number(`${index.toString().slice(-1)}`) * 3) / 6
      }

      return index / 6
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
    min-width: 100px;

    &:hover .button {
      box-shadow: 0px 0px 10px 0px rgba(var(--primary-text-color-rgb), 0.5);

      .icon {
        @include transform(scale(1.05) translateX(2px));
      }
    }
  }
}

</style>
