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
              </slot>

              <slot name="close">
                <div
                  class="modal__close is-flex is-justify-content-flex-end"
                >
                  <b-button
                    label="X"
                    @click="$emit('close')"
                  />
                </div>
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
    },
    handleSubmit: {
      type: Function,
      default: (event: any) => event
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

  .modal {
    &__close {
      @include flex($justify: flex-end);
      width: 100%;
    }
  }
}
</style>
