<template>
  <b-tabs
    size="is-large"
    class="block tabs"
    vertical
    @input="handleInputChange"
  >
    <b-tab-item
      v-for="(tab, index) of tabs"
      :key="index"
      :label="tab.label"
      :value="tab.label"
      :icon="tab.icon"
    />
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
