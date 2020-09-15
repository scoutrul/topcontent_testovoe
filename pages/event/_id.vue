<template lang="pug">
  section(v-if="!isLoading" :key="updateKey")
    .hero.is-medium.is-primary.is-bold.content
      .hero-body(v-if="dataEvent")
        .container
          .title  {{dataEvent.title}}
          .subtitle {{dataEvent.description}}
    .container.px-2.pb-6
        .is-size-3.has-text-centered.my-4 Please choose the seat:
        .content.columns.is-mobile.is-multiline.is-centered
          div(v-for="stand in dataEvent.stands" :key="stand.id").column.is-narrow
            .card
              .card-header.content
                .card-header-title.justify-center Row: {{ stand.row_number }}
                .card-header-title.justify-center Seat: {{ stand.seat_number }}
              div(v-if="stand.company").card-content.content
                .has-text-centered(v-if="stand.company.name") {{ stand.company.name }}
                b-image(
                  v-if="stand.company.logo"
                  :src="stand.company.logo"
                  alt="A random image"
                  style="max-width: 100px")
              .content(v-else)
                .has-text-centered Price: {{ stand.price }}
              footer.card-footer()
                b-button(
                  @click="cardModal(stand)"
                  :type="stand.company ? 'is-light' : 'is-success'"
                  :disabled="stand.company"
                ).card-footer-item {{ stand.company ? 'reserved': 'Keep!'}}
</template>

<script>
import OrderForm from '~/components/OrderForm'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  components: { OrderForm },
  name: 'Event',
  async fetch() {
    await this.updateData()
  },
  data: () => ({
    facility: 'event',
    apiPath: 'events',
    stand: {},
    updateKey: 0,
    dataEvent: {},
  }),
  computed: {
    ...mapState({
      event(state) {
        return state[`${this.facility}/${this.$route.params.id}`] || {}
      },
      isLoading: (state) => state.isLoading,
    }),
  },

  methods: {
    ...mapActions({
      getData: 'getData',
    }),
    cardModal(item) {
      this.$buefy.modal.open({
        parent: this,
        component: OrderForm,
        props: { item },
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: { updateData: this.updateData },
      })
    },
    async updateData() {
      await this.getData({
        facility: `${this.facility}/${this.$route.params.id}`,
        path: `${this.apiPath}/${this.$route.params.id}`,
      }).then(() => {
        this.updateKey++
        this.dataEvent = this.$store.state[
          `${this.facility}/${this.$route.params.id}`
        ]
      })
    },
  },
}
</script>
<style scoped>
.card-header {
  background: #eaeaea;
  box-shadow: none;
  width: 100%;
}
.company {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4px;
  width: 100%;
  max-width: 240px;
  min-height: 220px;
  margin: 10px;
}
.places {
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
}
</style>
