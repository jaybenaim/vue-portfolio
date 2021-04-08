<template>
  <b-tabs
    class="block tabs"
    size="is-large"
    v-bind="$attrs"
    :animated="false"
    destroy-on-hide
    vertical
    @input="handleInputChange"
  >
    <b-tab-item
      v-for="(tab, index) of tabs"
      :key="index"
      :label="tab.label"
      :value="tab.label"
      :icon="tab.icon"
    >
      <slot v-once></slot>
    </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { ITab } from '@/lib/types'
import Vue from 'vue'

export default Vue.extend({
  name: 'tabs',
  props: {
    tabs: {
      type: Array as () => ITab[],
      required: true
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
