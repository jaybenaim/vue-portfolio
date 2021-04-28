<template>
  <b-tabs
    class="block"
    :class="className"
    v-bind="tabProps"
    :destroy-on-hide="tabProps.destroyOnHide"
    @input="handleInputChange"
  >
    <b-tab-item
      v-for="(tab, index) in tabs"
      :key="index"
      :label="tab.label"
      :value="tab.label"
      :icon="tab.icon.icon"
    >
      <slot></slot>
    </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { ITab } from '@/lib/types'
import { ITabProps } from '@/lib/types/components/tabs'
import Vue from 'vue'

export default Vue.extend({
  name: 'tabs-default',
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
    handleInputChange(tab: any) {
      this.$emit('tab-selected', tab)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
