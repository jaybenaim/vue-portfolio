<template>
  <section class="mb-5">
    <label
      v-if="showLabel"
      class="label"
    >Image</label>
    <b-field
      class="file"
      v-if="asButton"
      :message="errors.uploadError"
      :type="{
        'is-danger': errors.uploadError
      }"
    >
      <b-upload
        v-model="file"
        expanded
      >
        <a class="button is-primary is-fullwidth">
          <b-icon icon="upload"></b-icon>
          <span>{{ file.name || "Click to upload"}}</span>
        </a>
      </b-upload>
    </b-field>

    <b-field
      v-else
      :message="errors.uploadError"
      :type="{
        'is-danger': errors.uploadError
      }"
    >
      <b-upload
        v-model="file"
        drag-drop
        expanded
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                icon="upload"
                size="is-medium"
              ></b-icon>
            </p>
            <p>Drop your files here or click to upload</p> {{ file.name }}
          </div>
        </section>
      </b-upload>
    </b-field>

    <div
      class="tags"
      v-if="multiple"
    >
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'upload-drag-and-drop',
  props: {
    asButton: {
      type: Boolean,
      default: false,
    },
    labelPosition: {
      type: String,
      default: 'inside',
      validator: (value: string) => [
        '',
        'inside',
        'on-border'
      ].indexOf(value) > -1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    file() {
      if (this.file.size <= 102400) {
        this.errors.uploadError = ''
        this.$emit('uploaded', this.file)
      } else {
        this.errors.uploadError = 'The file is too large. Please try a smaller file.'
      }
    }
  },
  data() {
    return {
      file: {} as File,
      errors: {
        uploadError: ''
      }
    }
  }
})
</script>
