<template lang="pug">
  section(v-if="!isLoading")
      .container.hero.is-medium.is-primary.is-bold
        h1.title {{event.title}}
        h1.subtitle {{event.description}}
      button(@click="$router.push('/')") back to map
      div(v-for="item in event.stands" :key="item.id").card
        div row_number: {{ item.row_number }}
        div seat_number: {{ item.seat_number }}
        button(:disabled="order.stand.id === item.id" @click="openForm(item)") Stand

</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'Event',
  async fetch() {
    await this.getData({
      facility: `${this.facility}/${this.$route.params.id}`,
      path: `${this.apiPath}/${this.$route.params.id}`,
    })
  },
  data: () => ({
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
      event(state) {
        return state[`${this.facility}/${this.$route.params.id}`]
      },
      isLoading: (state) => state.isLoading,
    }),
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
