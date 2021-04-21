<template>
  <div class="contact container">
    <section class="section mt-6">
      <div class="contact__title-container">
        <h1 class="title primary-text">
          Contact Me
        </h1>

        <em>Contact me for new website builds, programming help and tutoring.</em>
      </div>

      <div class="contact__containers mt-6">
        <div class="contact__left-side">

        </div>

        <div class="contact__right-side">
          <!-- Contact Form -->
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContactForm from './components/ContactForm/contact-form.vue'

export default Vue.extend({
  components: { ContactForm },
  name: 'contact'
})
</script>

<style lang="scss">
.contact {

  &__containers {
    @include flex($dir: row, $justify: space-evenly);
  }

  &__left-side,
  &__right-side {
    background-color: rgba(var(--background-color-flipped-rgb), 0.15);
    border: 1px solid var(--primary-text-color-flipped);
    height: 530px;
    width: 40%;
  }
}
</style>
