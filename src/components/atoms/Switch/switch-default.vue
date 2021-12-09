<template>
  <div class="switch">
    <b-switch
      :value.sync="darkMode"
      passive-type="is-dark"
      @click.native="$store.commit('toggleTheme')"
    >
      {{ modeText ? "Dark Mode" : "Light Mode" }}
    </b-switch>
  </div>
</template>

<script lang="ts">
import Theme from '@/mixins/Theme'

export default Theme.extend({
  name: 'switch-default',
  mixins: [Theme],
  computed: {
    modeText() {
      return this.$store.getters.getTheme === 'dark'
    }
  },
  data() {
    return {
      darkMode: this.$store.getters.getTheme === 'dark'
    }
  },
})
</script>

<style lang="scss">
.switch {
  &:hover input[type=checkbox]:checked {
    background: rgba(var(--secondary-rgb), 0.6) !important;
  }

  input[type=checkbox]:checked {
    background: var(--secondary) !important;
  }

  &:hover input[type=checkbox] + .check {
    background: rgba(var(--secondary-rgb), 0.6) !important;
  }

  input[type=checkbox] + .check {
    background: rgba(var(--secondary-rgb), 0.7) !important;
  }

  .control-label {
    color: var(--primary-text-color);
  }

  .check.is-dark-passive:hover {
    box-shadow: 0px 0px 8px 0px rgba(var(--primary-text-color-rgb), 0.5);
  }

}
</style>
