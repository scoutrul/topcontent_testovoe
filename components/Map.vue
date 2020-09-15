<template lang="pug">
    gmap-map(
      ref="gmap"
      :center="this.data[0] ? formatLocation(this.data[0].location) : {}"
      map-type-id="terrain"
      :zoom="3.2"
      )
      gmap-marker(
        v-for="(item, index) in $store.state[facility]"
        :key="index"
        :position="formatLocation(item.location)"
        :clickable="true"
        @mouseover="statusText = item.title"
        @mouseout="statusText = null"
        @click="toggleInfoWindow(item,index)"
      )
      gmap-info-window(
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false")
        p.title.is-4 {{activeItem.title}}
        .content
          div {{activeItem.description}}
          div Start: {{activeItem.start_date}}
          div End: {{activeItem.end_date}}
        .action
          b-button(@click="goToEvent(activeItem.id)" type="is-warning") Go!
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Map',
  props: {
    facility: {
      type: String,
      default: '',
    },
    apiPath: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    statusText: '',
    infoWindowPos: {
      lat: 0,
      lng: 0,
    },
    infoWinOpen: false,
    currentMidx: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35,
      },
    },
    activeItem: {},
  }),
  computed: {
    ...mapState({
      data(state) {
        return state[this.facility]
      },
      isLoading: (state) => state.isLoading,
    }),
  },
  beforeMount() {
    if (!this.isLoading) {
      this.$refs.gmap &&
        this.$refs.gmap.$mapPromise.then((map) => {
          const bounds = new google.maps.LatLngBounds()
          for (const m of this.$store.state[this.facility]) {
            bounds.extend(this.formatLocation(m.location))
          }
          map.fitBounds(bounds)
        })
    }
  },
  methods: {
    goToEvent(id) {
      this.$router.push(`/event/${id}`)
    },
    formatLocation(location) {
      if (!location) return {}
      const split = location.split(',')
      return { lat: +split[0], lng: +split[1] }
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = this.formatLocation(marker.location)
      this.activeItem = marker
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.vue-map-container {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: auto;
}
</style>
<style lang="scss">
.gm-ui-hover-effect {
  top: 8px !important;
  right: 8px !important;
}
</style>
