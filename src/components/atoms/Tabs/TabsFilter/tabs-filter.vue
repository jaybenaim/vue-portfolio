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
          append-to-body
          mobile-modal
          can-close
        >
          <template #trigger>
            <b-tabs
              v-bind="tabProps"
              :destroy-on-hide="tabProps.destroyOnHide"
              class="dropdown__languages"
            >
              <b-tab-item
                class="tab-item"
                name="Languages"
                label="Languages"
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
              child: dropTab,
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
        filter: {
          name: tab,
          label: tab
        },
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
    @include flex();

    @media (max-width: 768px) {
      border: 1px solid #dbdbdb;
      border-left: 1px solid #dbdbdb;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-radius: 4px;
    }

    a {
     @media (max-width: 768px) {
        padding: 0.2em 1em !important;
      }
    }

    .dropdown {
      margin-left: -15px;

      @media (min-width: 768px) {
        position: absolute;
        z-index: 6;
        max-height: 70px;
      }

      li a span {
        color: rgba(var(--primary-text-color-rgb), 0.5);
      }
    }

    a:first-of-type {
      border: none;
      padding-left: 0;
      justify-content: flex-start;
      padding: 0.5rem 25px 0.5rem 15px;
      margin-left: 0px;

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
      border-radius: 4px 4px 0 0;

      &:hover {
        background-color: var(--background-color-hover) !important;
        color: rgba(var(--primary-text-color-rgb), 1) !important;
        border-bottom-color: rgba(var(--primary-text-color-rgb), 1) !important;
        pointer-events: all;
      }
    }
  }
}

// Overrides
.dropdown .tabs {
  all: revert !important;
}

.dropdown-content {
  @include theme();

  .dropdown-item {
    color: rgba(var(--primary-text-color-rgb), 8) !important;

    &:hover {
      background-color: var(--background-color-hover) !important;
      color: rgba(var(--primary-text-color-rgb), 1) !important;
    }
  }
}

.b-tabs .tabs li.is-disabled {
  opacity: 1;
  cursor: pointer;
  pointer-events: all;
}
</style>
