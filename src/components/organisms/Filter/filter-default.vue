<template>
  <div class="filter-default">
    <section class="filter-default__filters">
      <TabsFilter
        v-if="tabList"
        :tabs="tabList"
        @tab-selected="(filter) => handleFilterChange(filter)"
        key="filter-tabs"
        :tabProps="tabProps"
      >
        <!-- <div v-if="useFilteredData"> -->
        <!-- <li
          v-for="(filter, index) of filterData.data"
          :key="index"
        >
             </li> -->
        <!-- </div> -->
      </TabsFilter>

    </section>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TabsFilter from '@/components/atoms/Tabs/TabsFilter/tabs-filter.vue'

import { FilterData } from '@lib/types/general/FilterList'
import { ITabFilter, ITabSelectedFilter } from '@/lib/types'
import { ITabProps } from '@/lib/types/components/tabs'

export default Vue.extend({
  components: { TabsFilter },
  name: 'filter-default',
  props: {
    filterData: {
      type: Object as () => FilterData
    },
    tabProps: {
      type: Object as () => ITabProps
    }
  },
  data() {
    return {
      tabList: [] as ITabFilter[],
      selectedFilter: {} as ITabSelectedFilter,
    }
  },
  watch: {
    // FilterData: {
    //   // deep: true,
    //   handler() {
    //     if (this.filterData) {
    //       this.generateFilters()
    //     }
    //   }
    // }
    'filterData.filters': function watcher() {
      this.generateFilters()
    }
  },
  created() {
    this.generateFilters()
  },
  methods: {
    handleFilterChange(filter: ITabSelectedFilter) {
      this.selectedFilter = filter
      this.$emit('filter-changed', filter)
    },
    generateFilters() {
      if (this.filterData.filters) {
        for (const filter of this.filterData.filters) {
          this.tabList.push({
            name: filter.name,
            label: filter.label,
            icon: filter.icon ? filter.icon : undefined,
            filterType: filter.filterType,
            filters: filter.filters
          })
        }
      }
    }
  }
})
</script>

<style lang="scss">
$maxHeight: 70px !important;

.filter-default__filters {
  .tabs {
    min-width: 100%;
    height: 200px;

    @media (min-width: 768px) {
      height: $maxHeight;
    }
  }

  ul {
    max-height: $maxHeight;
  }

  .tab-content {
    display: none !important;
  }

  a {
    color: rgba(var(--primary-text-color-rgb), 0.4);
    background-color: var(--background-color);

    &:hover {
      color: rgba(var(--primary-text-color-rgb), 1);
      background-color: var(--background-color-hover) !important;
    }
  }

  .is-active a {
    color: rgba(var(--primary-rgb), 1);
    background-color: var(--background-color) !important;
  }

  .dropdown-menu {
    height: 0;
  }
}
</style>
