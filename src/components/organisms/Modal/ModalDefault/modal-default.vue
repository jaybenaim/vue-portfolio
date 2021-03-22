<template>
  <div class="modal-default">
    <b-modal
      :aria-modal="true"
      :active="active"
      :can-cancel="canCancel"
      :on-cancel="() => $emit('close')"
      :auto-focus="true"
    >
      <template>
        <form
          class="form is-flex is-justify-content-center"
        >
          <div class="modal-card">
            <slot name="header">
              <header class="modal-card-head modal-card__head theme-colors">
                <p class="modal-card-title">
                  Sign Up
                </p>

                <button
                  type="button"
                  class="delete"
                  @click="$emit('close')"
                />
              </header>
            </slot>

            <section class="modal-card-body modal-card__body theme-colors">
              <slot>

              </slot>
            </section>

            <slot name="footer">
              <footer
                class="modal-card-foot modal-card__footer
                 p-3 mb-5 theme-colors is-flex is-justify-content-space-between"
              >
                <b-button
                  label="Cancel"
                  @click="$emit('close')"
                />

                <b-button
                  label="Sign Up"
                  type="is-primary"
                  class="is-align-self-flex-end"
                  @click.prevent="handleSubmit"
                />
              </footer>
            </slot>
          </div>
        </form>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'modal-default',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    isActive: {
      type: Boolean,
      default: true
    },
    canCancel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      active: this.isActive
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
