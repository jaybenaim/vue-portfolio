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
            <header class="modal-card-head modal-card__head">
              <slot name="header">
                <p class="modal-card-title">
                  Sign Up
                </p>

                <button
                  type="button"
                  class="delete"
                  @click="$emit('close')"
                />
              </slot>
            </header>

            <section class="modal-card-body modal-card__body p-6">
              <slot>
              </slot>
            </section>

            <footer
              class="modal-card-foot modal-card__footer
                 p-3 mb-5 is-flex is-justify-content-space-between"
            >
              <slot name="footer">
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
              </slot>
            </footer>
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

<style lang="scss">
.modal-default {
  .label {
    text-align: left;
    color: var(--primary-text-color);
  }

  .modal-card {
    &__head,
    &__body,
    &__footer,
    .modal-card-title {
      @include theme()
    }
  }
}
</style>
