<template>
  <b-tooltip
    class="tooltip"
    v-bind="$attrs"
  >
    <slot></slot>
  </b-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'tooltip',
})
</script>

<style lang="scss">

</style>
