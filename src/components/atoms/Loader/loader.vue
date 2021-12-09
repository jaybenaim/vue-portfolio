<template>
  <b-loading
    class="loader-default"
    :is-full-page="isFullPage"
    v-model="isLoading"
    :can-cancel="canCancel"
  ></b-loading>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'loader',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    /**
     * This will limit the loader to the container
     */
    isFullPage: {
      type: Boolean,
      default: true
    },
    canCancel: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.loader-default {
  @include flex();
  height: 100%;
  width: 100%;

  .loading-background {
    background: transparent !important;
  }

  .loading-icon::after {
    border-color: #00f070 !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
  }
}
</style>
