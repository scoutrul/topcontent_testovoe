<template lang="pug">
  <section>
    <b-field label="Name">
      <b-input v-model="name" placeholder="Company name"></b-input>
    </b-field>
    <b-field label="Admin">
      <b-input placeholder="Kevin Garvey" v-model="admin"></b-input>
    </b-field>

    <b-field label="Email">
      <b-input type="email" placeholder="email@mail" maxlength="30" v-model="email">
      </b-input>
    </b-field>

    <b-field placeholder="Details">
      <b-input maxlength="200" type="textarea" v-model="details"></b-input>
    </b-field>

    <b-field class="file is-primary" :class="{ 'has-name': !!file }">
      <b-upload v-model="file" class="file-label">
        <span class="file-cta">
          <b-icon class="file-icon" icon="upload"></b-icon>
          <span class="file-label">Click to upload logotype</span>
        </span>
        <span class="file-name" v-if="file"> {{ file.name }}
        </span>
      </b-upload>
    </b-field>

    <b-field class="file is-primary" :class="{ 'has-name': !!file }">
      b-button(
        @click="sendForm"
        type="is-success"
        size="is-large"
        :disabled="$store.state.isLoading"
        ) Send request
    </b-field>
  </section>
</template>

<script>
export default {
  props: ['apiPath'],
  data() {
    return {
      name: '',
      admin: '',
      email: '',
      details: '',
      file: null,
    }
  },
  methods: {
    async sendForm() {
      const { name, admin, email, details, file } = this
      await this.$store.dispatch('postData', {
        path: `stands/${this.$route.params.id}`,
        data: {
          name,
          admin,
          email,
          details,
          file,
        },
      })
    },
  },
}
</script>
