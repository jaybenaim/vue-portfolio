<template>
  <section class="modal-form">
    <b-modal
      :active="isOpen"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
      @close="$emit('close')"
    >
      <template>
        <form action="">
          <div
            class="modal-card"
            style="width: auto"
          >
            <header class="modal-card-head">
              <p class="modal-card-title">
                New Post
              </p>

              <button
                type="button"
                class="delete"
                @click="$emit('close')"
              />
            </header>

            <section class="modal-card-body">
              <b-field
                label="Title"
                :label-position="labelPosition"
              >
                <b-input
                  v-model="formProps.title"
                  placeholder="Title"
                  required
                />
              </b-field>

              <b-field
                label="Author"
                :label-position="labelPosition"
              >
                <b-input
                  v-model="formProps.author"
                  placeholder="Your Name"
                  required
                />
              </b-field>

              <b-field
                label="Summary"
                :label-position="labelPosition"
              >
                <b-input
                  v-model="formProps.summary"
                  maxlength="200"
                  type="textarea"
                />
              </b-field>

              <b-field
                label="Content"
                :label-position="labelPosition"
              >
                <b-input
                  v-model="formProps.content"
                  maxlength="200"
                  type="textarea"
                />
              </b-field>

              <UploadDragAndDrop
                :label-position="labelPosition"
              />

              <b-field
                label="Image Caption"
                :label-position="labelPosition"
              >
                <b-input
                  v-model="formProps.imageCaption"
                  placeholder="Image Caption"
                />
              </b-field>

              <Sortable
                :label-position="labelPosition"
                @tags-updated="(currentTags) => formProps.tags = currentTags"
              />

              <b-field label="Publish Date">
                <b-datepicker
                  v-model="formProps.publishDate"
                  inline
                />
              </b-field>
            </section>

            <footer class="modal-card-foot">
              <b-button
                label="Close"
                @click="$emit('close')"
              />
              <b-button
                label="Login"
                type="is-primary"
              />
            </footer>
          </div>
        </form>
      </template>
    </b-modal>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import { Blog } from '@/lib/types/Blog'

import Sortable from '@/components/atoms/Sortable/sortable.vue'
import UploadDragAndDrop from '../input/UploadDragAndDrop/upload-drag-and-drop.vue'

export default Vue.extend({
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'on-border',
      validator: (value: string) => [
        'inside',
        'on-border'
      ].indexOf(value) > -1
    }
  },
  data() {
    return {
      formProps: {
        title: '',
        author: '',
        summary: '',
        content: '',
        image: '',
        imageCaption: '',
        publishDate: new Date(),
        tags: undefined as any
      } as Blog
    }
  },
  components: {
    UploadDragAndDrop,
    Sortable
  }
})
</script>
<style lang="scss">
.field:not(:last-child) {
  margin-top: 20px;
  margin-bottom: 20px;
}

.label {
  text-align: left;
  font-size: 18px !important;
}

.textarea {
  resize: none;
}
</style>
