<template lang="pug">
  section.orderForm

    b-field( label="Name")
      b-input( v-model="name" placeholder="Company name")

    b-field( label="Admin")
      b-input( placeholder="Kevin Garvey" v-model="admin")

    b-field( label="Email")
      b-input( type="email" placeholder="email@mail.com" maxlength="50" v-model="email")

    b-field( label="Phone")
      b-input( maxlength="254" type="phone" v-model="phone")

    b-field( label="Logo (url)" style="flex: 1 1 100%")
      b-input( maxlength="254" v-model="logo")

    b-field( label="Details")
      b-input( maxlength="254" type="textarea" v-model="details")

    b-button(
      expanded
      @click="sendForm"
      type="is-success"
      size="is-large"
      :disabled="$store.state.isLoading"
      ).my-4.mx-2 Send request
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      name: '',
      admin: '',
      email: '',
      phone: '',
      details: '',
      logo: '',
    }
  },

  methods: {
    async sendForm() {
      const { name, admin, email, phone, details, logo } = this
      const payload = {
        name,
        admin,
        email,
        details,
        logo,
        phone,
      }
      const res = {}
      Object.entries(payload).forEach(([key, value]) => {
        if (value) res[key] = value
      })
      await this.$store
        .dispatch('postData', {
          path: `stands/${this.item.id}`,
          data: res,
        })
        .then(() => this.$emit('close'))
    },
  },
}
</script>

<style lang="scss">
.orderForm {
  max-width: 540px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .field {
    flex: 1 0 50%;
    padding: 0 8px;
    margin: 0;
    min-width: 250px;
    label.label {
      color: #5cc775;
      display: block;
      font-size: 1rem;
      font-weight: 600;
      z-index: 11;
      position: relative;
    }
  }
}
</style>
