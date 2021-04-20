<template>
  <div class="repo-section container">
    <FilterDefault
      v-if="filterData"
      :filterData="filterData"
      :tabProps="tabProps"
      @filter-changed="handleFilterChange"
    />
    <div class="container">

      <ul class="repo-section__repos columns pt-5 pb-3">
        <Loader
          class="repo-section__loader"
          :isLoading="isLoading"
          :isFullPage="false"
        />

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
          v-if="showLoadMore && repos.length > 0"
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
  </div>
</template>

<script lang="ts">
import CardRepo from '@organisms/Card/Repo/card-repo.vue'

import { GithubData } from '@/helpers/github'
import ButtonDefault from '@/components/atoms/ButtonDefault/button-default.vue'
import Theme from '@/mixins/Theme'
import FilterDefault from '@/components/organisms/Filter/filter-default.vue'
import Responsive from '@/mixins/Responsive'
import { FilterData, IFilter } from '@/lib/types/general/FilterList'
import { ITabProps } from '@/lib/types/components/tabs'
import { IGithubRepo, IGithubUser } from '@/lib/types/models/Repo'
import { ITabSelectedFilter } from '@/lib/types'
import Loader from '@atoms/Loader/loader.vue'
import repoFilters from './repoFilters'

export default Responsive.extend(Theme).extend({
  name: 'repo-section',
  mixins: [Theme, Responsive],
  components: {
    CardRepo,
    ButtonDefault,
    FilterDefault,
    Loader
  },
  computed: {
    userData(): IGithubUser {
      return this.$store.getters.getUserInfo
    },
    repos(): IGithubRepo[] {
      return this.githubData.repos
    },
    showLoadMore(): boolean {
      if (this.githubData) {
        return this.repos.length < this.githubData.totalRepoCount
      }

      return false
    },
  },
  data() {
    return {
      githubData: undefined as any,
      filterData: undefined as any,
      selectedFilter: { filter: { name: 'All' } } as ITabSelectedFilter,
      tabProps: {} as ITabProps,
      isLoading: false
    }
  },
  async created() {
    this.githubData = await new GithubData().init()

    this.filterData = new FilterData(repoFilters as IFilter[])

    this.tabProps = {
      vertical: false,
      expanded: true,
      type: this.isMobile ? 'is-toggle-rounded' : 'is-boxed',
      destroyOnHide: false
    } as ITabProps
  },
  methods: {
    async loadMore() {
      this.isLoading = true

      if (this.repos) {
        let typeOfQuery = ''

        if (this.selectedFilter.filter.name.toLowerCase() === 'all') {
          typeOfQuery = 'get'
        } else {
          typeOfQuery = 'filter'
        }

        await this.githubData.loadMore(typeOfQuery, this.selectedFilter)

        this.isLoading = false
      }
    },
    getAnimationDelay(index: number): number {
      if (index === 0) {
        return 0.01
      }

      if (index % 30 === 0) {
        return 0.01
      }

      if (index > 30) {
        return 0.4
      }

      return index / 8
    },
    async handleFilterChange(selectedFilter: ITabSelectedFilter) {
      this.isLoading = true

      this.selectedFilter = selectedFilter
      const filter = selectedFilter.filter.name.toLowerCase()

      if (filter === 'all') {
        await this.githubData.getRepos()
      } else if (filter !== 'languages') {
        await this.githubData.filterRepos(selectedFilter)
      }

      this.isLoading = false
    }
  }
})
</script>

<style lang="scss">
.repo-section {

  .filter-default {
    position: sticky;
    left: 0;
    z-index: 5;
    min-width: 100%;

  }

  &__repos {
    overflow: auto;
    max-width: 100%;
    margin: 0;
    min-height: 482px;

    li:first-of-type {
      padding-left: 0;
    }
  }

  .card-repo {
    @include animate($name: tilt-in-tr, $duration: 1s, $delay: var(--delay));
    opacity: 0;

    &:first-of-type {
      margin-left: 0;
      padding-left: 0;
    }
  }

  &__load-more {
    @include animate($name: fade-in, $duration: 1.5s, $delay: 1s, $ease: ease-in-out);
    @include flex();
    opacity: 0;
    min-width: 100px;

    .button {
      &:hover {
        box-shadow: 0px 0px 10px 0px rgba(var(--primary-text-color-rgb), 0.5);

        .icon {
          @include transform(scale(1.05) translateX(2px));
        }
      }
    }
  }
}

</style>
