<template>
  <div class="account">
    <section class="section is-large mt-5">
      <b-skeleton
        width="20%"
        :animated="true"
      ></b-skeleton>

      <b-skeleton
        width="40%"
        :animated="true"
      ></b-skeleton>

      <b-skeleton
        width="80%"
        :animated="true"
      ></b-skeleton>

      <b-skeleton :animated="animated"></b-skeleton>

    </section>
  </div>
</template>

<script lang="ts">
import Auth from '@mixins/Auth'

export default Auth.extend({
  name: 'account',

})
</script>

<style lang="scss" scoped>

</style>
