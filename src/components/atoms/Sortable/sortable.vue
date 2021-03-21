<template>
  <section>
    <b-field
      :label="label"
      :label-position="labelPosition"
    >
      <b-taginput
        class="taginput-sortable"
        v-sortable="sortableOptions"
        v-model="tags"
        ellipsis
        icon="label"
        placeholder="JavaScript"
      >
      </b-taginput>
    </b-field>

    <div class="content tags__added">
      <b>Tags:</b>

      <ul class="tags__list">
        {{ tags }}
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
    /* eslint no-underscore-dangle: 0 */
    import Vue from 'vue'
    import Sortable from 'sortablejs'

    const createSortable = (el: any, options: any, vnode: any) => Sortable.create(el, {
      ...options,
      onEnd(evt: any) {
        const data = vnode.componentInstance.$data.tags
        const item = data[evt.oldIndex]
        if (evt.newIndex > evt.oldIndex) {
          for (let i = evt.oldIndex; i < evt.newIndex; i++) {
            data[i] = data[i + 1]
          }
        } else {
          for (let i = evt.oldIndex; i > evt.newIndex; i--) {
            data[i] = data[i - 1]
          }
        }
        data[evt.newIndex] = item
        vnode.componentInstance.$emit('input', data)
        vnode.context.$buefy.toast.open(`Moved ${item} from row ${evt.oldIndex + 1} to ${evt.newIndex + 1}`)
      }
    })
    /**
     * We add a new instance of Sortable when the element
     * is bound or updated, and destroy it when it's unbound.
     */
    const sortable = {
      name: 'sortable',
      bind(el: any, binding: any, vnode: any) {
        const container = el.querySelector('.taginput-container')
        container._sortable = createSortable(container, binding.value, vnode)
      },
      update(el: any, binding: any, vnode: any) {
        const container = el.querySelector('.taginput-container')
        container._sortable.destroy()
        container._sortable = createSortable(container, binding.value, vnode)
      },
      unbind(el: any) {
        const container = el.querySelector('.taginput-container')
        container._sortable.destroy()
      }
    }

    export default Vue.extend({
      directives: { sortable },
      props: {
        label: {
          type: String,
          default: 'Tags'
        },
        labelPosition: {
          type: String,
          default: 'on-border',
          validator: (value: string) => [
            '',
            'inside',
            'on-border'
          ].indexOf(value) > -1
        }
      },
      watch: {
        tags() {
          this.$emit('tags-updated', this.tags)
        }
      },
      data() {
        return {
          sortableOptions: {
            chosenClass: 'is-primary',
            draggable: '.tag'
          },
          tags: []
        }
      }
    })
</script>

<style lang="scss" scoped>
.taginput-sortable .tag {
  cursor: grab !important;
}

.tags {
  &__added {
    text-align: left;
  }

  &__list {
    @include flex($flex: inline-flex);
  }
}
</style>
