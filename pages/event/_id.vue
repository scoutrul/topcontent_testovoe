<template lang="pug">
  section(v-if="!isLoading")
      .container.hero.is-medium.is-primary.is-bold
        .is-medium  {{event.title}}
        h1.subtitle {{event.description}}
      div().box
        .buttons
          b-button(
            v-for="item in event.stands" :key="item.id"
            @click="openForm(item)"
            :type="'is-success is-light'"
            size="is-large"
            :inverted="order.stand.id !== item.id"
            :outlined="order.stand.id === item.id"
          ) row: {{ item.row_number }}, seat: {{ item.seat_number }}

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
      console.log('sdf')
      this.order.stand = item
    },
  },
}
</script>
