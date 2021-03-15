---
to: "src/components/<%= filepath || 'general' %>/<%= Name %>/<%= filepath ? name : Name %>.vue"
---

<template>
  <div class="<%= name %>"> 
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style lang="scss" scoped>

</style>
