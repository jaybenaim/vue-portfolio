<template>
  <div class="loader-custom">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'loader-custom',
  props: {
    size: {
      type: String,
      default: '8em'
    }
  },
  data() {
    return {
      isLoading: true
    }
  }
})
</script>

<style lang="scss">
$size: var(--size);

.loader-default {
  &::before {
    -webkit-animation: spinner 500ms infinite linear;
    animation: spinner 500ms infinite linear;
    border: 2px solid #dbdbdb;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    display: block;
    height: $size;
    position: relative;
    width: $size;
  }
}

@keyframes spinner {
  to {transform: rotate(360deg);}
}
</style>
