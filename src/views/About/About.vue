<template>
  <div class="about section is-small mt-5">
    <div class="about__title">
      <span
        class="letter"
        v-for="(letter, index) of title"
        :key="index"
        :style="`--delay: ${index / 10}s`"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'About',
  props: {
    title: {
      type: String,
      default: 'Where it all began...'
    },
  }
})
</script>

<style lang="scss">
.about {

  &__title {
    @include flex($justify: flex-start);
    font-size: 36px;

    .letter {
      @include animate($name: slide-right, $duration: 1.2s);
      @include animate($name: hand-drawn, $delay: var(--delay), $ease: ease-in, $duration: 1s);
      min-height: 56px;
    }
  }
}

</style>
