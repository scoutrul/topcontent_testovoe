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
                :type="stand.id === item.id ? 'is-success is-light' : ''"
                size="is-large"
                :inverted="stand.id !== item.id"
                :disabled="item.company"
              ) row: {{ item.row_number }}, seat: {{ item.seat_number }}, price: {{ item.price }}
          .content(v-if="stand.id")
            OrderForm
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

    stand: {},
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
      if (item.id === this.stand.id) {
        this.stand = {}
      } else {
        this.stand = item
      }
    },
  },
}
</script>
