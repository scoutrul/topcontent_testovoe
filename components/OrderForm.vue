<template lang="pug">
  section(style="max-width: 540px; margin: auto")
    <b-field label="Name">
      <b-input v-model="name" placeholder="Company name"></b-input>
    </b-field>
    <b-field label="Admin">
      <b-input placeholder="Kevin Garvey" v-model="admin"></b-input>
    </b-field>

    <b-field label="Email">
      <b-input type="email" placeholder="email@mail.com" maxlength="30" v-model="email">
      </b-input>
    </b-field>

    <b-field label="Details">
      <b-input maxlength="200" type="textarea" v-model="details"></b-input>
    </b-field>

    b-field
      b-upload(v-model="file" drag-drop :disabled="!!file")
        section.section
          .content.has-text-centered
            p
              b-icon(icon="upload" size="is-large")
            p Drop your files here or click to upload
    .tags
      span(
        v-if="file"
        class="tag is-primary") {{file.name}}
        button.delete.is-small(type="button" @click="file = null")

    b-field.file.is-primary(:class="{ 'has-name': !!file }")
      b-button(
        expanded
        @click="sendForm"
        type="is-success"
        size="is-large"
        :disabled="$store.state.isLoading"
        ).my-4 Send request
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
      const payload = {
        name,
        admin,
        email,
        details,
        file,
      }
      let res = {}
      Object.entries(payload).forEach(([key, value]) => {
        if (value) res[key] = value
      })
      await this.$store.dispatch('postData', {
        path: `stands/${this.$route.params.id}`,
        data: res,
      })
    },
  },
}
</script>
