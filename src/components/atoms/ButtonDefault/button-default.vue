<template>
  <b-button
    class="button-default"
    :class="$attrs.classname"
    v-bind="$attrs"
    @click="$emit('clicked')"
  >
    <slot></slot>
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'button-default'
})
</script>

<style lang="scss" scoped>

</style>
