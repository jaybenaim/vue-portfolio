<template>
  <b-tabs
    class="block tabs-filter"
    :class="className"
    v-bind="tabProps"
    :destroy-on-hide="tabProps.destroyOnHide"
    @input="handleInputChange"
  >
    <b-tab-item
      v-for="(tab, index) in tabs"
      :key="index"
      :name="tab.name"
      :label="tab.label"
      :value="tab.label"
      :icon="tab.icon"
      :headerClass="tab.filterType === 'select' ? 'tabs-filter__select' : ''"
      :disabled="tab.filterType === 'select'"
    >
      <template
        #header
        v-if="tab.filterType === 'select'"
      >
        <b-dropdown
          :triggers="['click']"
          aria-role="list"
          class="tabs-filter__dropdown"
          position="is-bottom-left"
        >
          <template #trigger>
            <b-tabs
              v-bind="tabProps"
              :destroy-on-hide="tabProps.destroyOnHide"
            >
              <b-tab-item
                class="tab-item"
                :name="tab.name"
                :label="tab.label"
                icon="menu-down"
              />
            </b-tabs>
          </template>

          <b-dropdown-item
            aria-role="listitem"
            v-for="(dropTab, index) in tab.filters"
            :key="index"
            :name="dropTab.name"
            :label="dropTab.label"
            :value="dropTab.label"
            :icon-left="dropTab.icon"
            @click.native="(event) => handleInputChange(event.target.name, {
              child: true,
              parent: 'Languages'
            })"
          >
            <b-icon :icon="dropTab.icon"/>

            {{ dropTab.name }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <slot></slot>
    </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { ITab, ITabRelation, ITabSelectedFilter } from '@/lib/types'
import { ITabProps } from '@/lib/types/components/tabs'
import Vue from 'vue'

export default Vue.extend({
  name: 'tabs-filter',
  props: {
    tabs: {
      type: Array as () => ITab[],
      required: true
    },
    tabProps: {
      type: Object as () => ITabProps
    },
    className: {
      type: String
    }
  },
  methods: {
    handleInputChange(tab: string, relation: ITabRelation) {
      this.$emit('tab-selected', {
        filter: tab,
        relation
      } as ITabSelectedFilter)
    }
  }
})
</script>

<style lang="scss">
.tabs-filter {
  &__select {
    color: rgba(var(--primary-text-color-rgb), 0.4) !important;

    a:first-of-type {
      border: none;
      padding-left: 0;
      justify-content: flex-start;

      &:hover {
        background-color: transparent !important;
        pointer-events: all;
      }
    }

    .tabs.is-boxed li.is-active a {
      color: rgba(var(--primary-text-color-rgb), 0.4) !important;
      border: 1px solid var(--primary-text-color);
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-color: rgba(var(--primary-text-color-rgb), 0.4) !important;
      border-bottom-color: rgba(var(--primary-text-color-rgb), 0.4) !important;

      &:hover {
        background-color: var(--background-color-hover) !important;
        color: rgba(var(--primary-text-color-rgb), 1) !important;
        border-bottom-color: rgba(var(--primary-text-color-rgb), 1) !important;
        pointer-events: all;
      }
    }

    .dropdown {
      position: absolute;
      z-index: 6;
    }

    .dropdown-content {
      width: 100%;
      @include theme();

      .dropdown-item {
        @include flex($justify: flex-start);
        color: rgba(var(--primary-text-color-rgb), 0.4) !important;
        position: relative;
        z-index: auto;
        border: none;
        padding-left: initial;

        &:hover {
          background-color: var(--background-color-hover) !important;
          color: rgba(var(--primary-text-color-rgb), 1) !important;
        }
      }
    }
  }
}

// Overrides
.b-tabs .tabs li.is-disabled {
  opacity: 1;
  cursor: pointer;
  pointer-events: all;
}
</style>
