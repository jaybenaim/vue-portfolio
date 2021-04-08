<template>
  <div class="card card-blank">
    <div class="card-image">
      <slot name="card-image">
      </slot>
    </div>

    <div class="card-content">
      <div class="media">
        <slot name="media">
          <div class="media-left">
            <slot name="media-left"></slot>
          </div>

          <div class="media-content">
            <slot name="media-content"></slot>
          </div>
        </slot>
      </div>

      <div class="content">
        <slot></slot>
      </div>

      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'card-blank'
})
</script>

<style lang="scss" scoped>

</style>
