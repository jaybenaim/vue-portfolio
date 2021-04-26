<template>
  <b-notification
    class="notification"
    :auto-close="notification.autoClose"
    :aria-close-label="notification.closeLabel"
    :active="isActive"
    :type="notification.type"
    :duration="notification.duration"
    :position="notification.position"
    :has-icon="notification.hasIcon"
    @close="handleClose"
  >
    <slot>{{ notification.message }}</slot>
  </b-notification>
</template>

<script lang="ts">
import { INotification } from '@/lib/types'
import Vue from 'vue'

export default Vue.extend({
  name: 'notification-default',
  props: {
    notification: {
      type: Object as () => INotification,
      required: true
    },
    closeNotification: {
      type: Object as () => INotification
    },
    useCustomContent: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.isActive && this.openNotification
  },
  updated() {
    this.isActive && this.openNotification
  },
  methods: {
    openNotification() {
      this.$buefy.notification.open(this.notification)
    },
    handleClose() {
      this.$emit('close')

      this.$store.commit('setNotification', this.closeNotification ? this.closeNotification : {})
    }
  },
})
</script>

<style lang="scss">

</style>
