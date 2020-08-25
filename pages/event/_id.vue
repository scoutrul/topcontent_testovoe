<template lang="pug">
  section(v-if="data")

    .container.hero.is-medium.is-primary.is-bold
      h1.title {{data.title}}
      h1.subtitle {{data.description}}
    button(@click="$router.push('/')") back to map
    div(v-for="item in data.stands" :key="item.id").card
      div row_number: {{ item.row_number }}
      div seat_number: {{ item.seat_number }}
      button(:disabled="order.stand.id === item.id" @click="openForm(item)") Stand
    div(v-if="order.stand.id").control
      div ID {{ order.stand.id }}
      
      input.input.is-rounded(type="text" placeholder="name" v-model="order.form.name")
      input.input.is-rounded(type="text" placeholder="admin" v-model="order.form.admin")
      <b-field>
          <b-input placeholder="Email" type="email"  v-model="order.form.email"></b-input>
      </b-field>
      input.input.is-rounded(type="tel" placeholder="phone" v-model="order.form.phone")
      textarea.textarea(placeholder="details" v-model="order.form.details")
      <b-field class="file is-primary" :class="{'has-name': !!order.form.logo}">
        <b-upload v-model="order.form.logo" class="file-label">
            <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="file">{{ order.form.logo.name }}
            </span>
        </b-upload>
      </b-field>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'Event',
  data: () => ({
    tick: 0,
    isComponentModalActive: false,
    facility: 'event',
    apiPath: 'events',
    order: {
      stand: {},
      form: {
        name: '',
        admin: '',
        email: '',
        phone: '',
        details: '',
        logo: '',
      },
    },
  }),
  computed: {
    ...mapState({
      data(state) {
        return state[`${this.facility}/${this.$route.params.id}`]
      },
      isLoading: (state) => state.isLoading,
    }),
  },
  async fetch() {
    await this.getData({
      facility: `${this.facility}/${this.$route.params.id}`,
      path: `${this.apiPath}/${this.$route.params.id}`,
    })
  },
  methods: {
    ...mapActions({
      getData: 'getData',
    }),
    openForm(item) {
      this.order.stand = item
    },
  },
}
</script>
