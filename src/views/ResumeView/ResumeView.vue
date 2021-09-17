<template>
  <div class="resume">
    <a
      href="http://localhost:8080/resume.pdf"
    >
      View Resume
    </a>
    <a
      href="./resume.pdf"
      target="_blank"
    >resume</a>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'resume-view',
  props: {
  },
  data() {
    return {
    }
  },
  components: {
  }
})
</script>

<style lang="scss" scoped>
.resume {
}
</style>
