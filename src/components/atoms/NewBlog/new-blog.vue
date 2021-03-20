<template>
  <div class="new-blog">
    <ButtonDefault
      rounded
      icon-right="plus"
    >
    </ButtonDefault>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonDefault from '../ButtonDefault/button-default.vue'

export default Vue.extend({
  name: 'new-blog',
  props: {
    icon: {
      type: String,
      default: 'add'
    }
  },
  components: { ButtonDefault }
})
</script>

<style lang="scss" scoped>

</style>
