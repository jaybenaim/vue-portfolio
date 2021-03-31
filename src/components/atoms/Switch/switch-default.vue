<template>
  <div class="switch">
    <b-switch
      v-model="darkMode"
      passive-type="is-dark"
      @click.native="$store.commit('toggleTheme')"
    >
      {{ darkMode ? "Dark Mode" : "Light Mode" }}
    </b-switch>
  </div>
</template>

<script lang="ts">
import Theme from '@/mixins/Theme'

export default Theme.extend({
  name: 'switch-default',
  data() {
    return {
      darkMode: this.theme === 'dark'
    }
  },
  watch: {
    theme() {
      return this.$store.getters.getTheme
    }
  }
})
</script>

<style lang="scss">
.switch {
  &:hover input[type=checkbox]:checked {
    background: rgba(var(--secondary-rgb), 0.7) !important;
  }

  input[type=checkbox]:checked {
    background: var(--secondary) !important;
  }

  &:hover input[type=checkbox] + .check {
    background: rgba(var(--secondary-rgb), 0.7) !important;
  }

  input[type=checkbox] + .check {
    background: var(--secondary) !important;
  }

  .control-label {
    color: var(--primary-text-color);
  }
}
</style>
