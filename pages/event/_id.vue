<template lang="pug">
  section(v-if="!isLoading")
      .hero.is-medium.is-primary.is-bold.content
        .hero-body
          .container
            .title  {{event.title}}
            .subtitle {{event.description}}
      .container
          .content Please choose the seat:
          .buttons.content
            div(v-for="item in event.stands" :key="item.id")
              div(v-if="item.company")
                .field Standed by {{ item.company.name }}
                img(
                  :src="item.company.logo"
                  alt="A random image"
                  width="64")
              b-button(
                @click="openForm(item)"
                :type="order.stand.id === item.id ? 'is-success is-light' : ''"
                size="is-large"
                :inverted="order.stand.id !== item.id"
                :disabled="item.company"
              ) row: {{ item.row_number }}, seat: {{ item.seat_number }}, price: {{ item.price }}
          .content(v-if="order.stand.id")
            OrderForm(:apiPath="`${apiPath}/${this.$route.params.id}`")
</template>

<script>
import OrderForm from '~/components/OrderForm'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  components: { OrderForm },
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
      if (item.id === this.order.stand.id) {
        this.order.stand = {}
      } else {
        this.order.stand = item
      }
    },
  },
}
</script>
