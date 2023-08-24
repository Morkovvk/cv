<template>
  <div class="contacts">
    <h3 class="sidebar-title">Contacts</h3>
    <p class="contacts-item">
      <span class="contacts-type">N: </span>
      <input v-model="contacts.phone" class="contacts-number" @input="formatPhoneNumber" maxlength="13" placeholder="Your phone number" />
    </p>
    <p class="contacts">
      <span class="contacts-type">E: </span>
      <input v-model="contacts.email" class="contacts-email" @input="formatEmail" placeholder="Your e-mail" />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: {
        phone: '',
        email: '',
      },
    };
  },
  methods: {
    formatPhoneNumber() {
      // Форматуємо номер телефону, видаляючи всі символи, крім цифр та знака "+"
      this.contacts.phone = this.contacts.phone.replace(/[^0-9+]/g, '');
    },

    formatEmail() {
      // Валідація для адреси електронної пошти з використанням регулярного виразу
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      if (!emailRegex.test(this.contacts.email)) {
        // Якщо адреса не відповідає формату, очищаємо поле
        this.contacts.email = '';
      }
    },
  },
  computed: {
    telLink() {
      return 'tel:' + this.contacts.phone.replace(/[^0-9]/g, '');
    },
    emailLink() {
      return 'mailto:' + this.contacts.email;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
