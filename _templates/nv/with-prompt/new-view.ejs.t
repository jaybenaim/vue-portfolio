---
to: "src/views/<%= Name %>/<%= Name %>.vue"
---

<template>
  <div class="<%= h.changeCase.kebab(name) %>">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: '<%= h.changeCase.kebab(name) %>'
})
</script>

<style lang="scss" scoped>

</style>
