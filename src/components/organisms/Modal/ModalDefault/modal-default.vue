<template>
  <div class="modal-default">
    <b-modal
      :aria-modal="true"
      :active="active"
      :can-cancel="canCancel"
      :on-cancel="() => $emit('close')"
      :auto-focus="true"
    >
      <slot></slot>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'modal-default',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    isActive: {
      type: Boolean,
      default: true
    },
    canCancel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      active: this.isActive
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
