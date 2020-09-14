<template lang="pug">
  section.layout

    <b-field label="Name">
      <b-input v-model="name" placeholder="Company name"></b-input>
    </b-field>

    <b-field label="Admin">
      <b-input placeholder="Kevin Garvey" v-model="admin"></b-input>
    </b-field>

    <b-field label="Email">
      <b-input type="email" placeholder="email@mail.com" maxlength="50" v-model="email">
      </b-input>
    </b-field>

    <b-field label="Phone">
      <b-input maxlength="200" type="phone" v-model="phone"></b-input>
    </b-field>

    <b-field label="Logo (url)">
      <b-input maxlength="200" v-model="file"></b-input>
    </b-field>

    <b-field label="Details">
      <b-input maxlength="200" type="textarea" v-model="details"></b-input>
    </b-field>

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
  props: ['apiPath'],
  data() {
    return {
      name: '',
      admin: '',
      email: '',
      phone: '',
      details: '',
      file: '',
    }
  },
  methods: {
    async sendForm() {
      const { name, admin, email, phone, details, file } = this
      const payload = {
        name,
        admin,
        email,
        details,
        file,
        phone,
      }
      const res = {}
      Object.entries(payload).forEach(([key, value]) => {
        if (value) res[key] = value
      })
      await this.$store
        .dispatch('postData', {
          path: `stands/${this.$route.params.id}`,
          data: res,
        })
        .then(() => this.$emit('close'))
    },
  },
}
</script>

<style lang="scss" scoped>
.layout {
  max-width: 540px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .field {
    flex: 1 0 50%;
    padding: 0 8px;
    margin: 0;
    .label {
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
