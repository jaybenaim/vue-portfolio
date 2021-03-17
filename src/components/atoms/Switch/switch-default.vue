<template>
  <div class="switch">
    <b-switch
      v-model="darkMode"
      passive-type="is-dark"
      type="is-warning"
      @click.native="$store.commit('toggleTheme')"
    >
      {{ darkMode ? "Dark Mode" : "Light Mode" }}
    </b-switch>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'switch-default',
  data() {
    return {
      darkMode: this.$store.getters.getTheme !== 'light'
    }
  }
})
</script>

<style lang="scss">
.switch {
  &:hover input[type=checkbox]:checked + .check.is-warning {
    background: rgba(var(--secondary-rgb), 0.7) !important;
  }

  input[type=checkbox]:checked + .check.is-warning {
    background: var(--secondary) !important;
  }
}
</style>
