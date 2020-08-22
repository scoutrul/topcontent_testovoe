<template lang="pug">
  section.section
    gmap-map(:center="center" map-type-id="terrain" :zoom="5")
      gmap-marker(
        v-for="(item, index) in markers"
        :key="index"
        :position="item.position"
        @click="center = item.position"
      )
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Events',
  data: () => ({
    facility: 'events',
    apiPath: 'events',
    center: { lat: -3.350235, lng: 111.995865 },
    markers: [
      { position: { lat: -0.48585, lng: 117.1466 } },
      { position: { lat: -6.9127778, lng: 107.6205556 } },
    ],
  }),
  computed: {
    ...mapState({
      data: (state) => state.events,
      isLoading: (state) => state.isLoading,
    }),
  },
  mounted() {
    this.getData({ facility: this.facility, path: this.apiPath })
  },
  methods: {
    ...mapActions({
      getData: 'getData',
    }),
  },
}
</script>
<style lang="scss" scoped>
.vue-map-container {
  height: 450px;
  max-width: 992px;
  width: 100%;
  margin: auto;
}
</style>
