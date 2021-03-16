<template>
  <div>
    <MenuMobile
      :open.sync="open"
      @close="handleMenu"
    />
    <!-- Open Toggler -->
    <slot>
      <b-button
        @click="open = !open"
      >
        <b-icon
          icon="menu"
          size="is-big"
        />
      </b-button>
    </slot>
  </div>
</template>

<script>
import MenuMobile from '@layout/MenuMobile/MenuMobile'

export default {
  name: 'home',
  data() {
    return {
      open: false
    }
  },
  methods: {
    handleMenu() {
      this.open = false
    }
  },
  components: {
    MenuMobile
  }
}
</script>

<style>

</style>
