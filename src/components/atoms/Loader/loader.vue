<template>
  <div>
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="canCancel"
    ></b-loading>
  </div>
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
