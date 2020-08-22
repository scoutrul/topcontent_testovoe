<template lang="pug">
    gmap-map(
      ref="gmap"
      :center="getCenter"
      :averageCenter="true"
      map-type-id="terrain"
      :zoom="2"
      style="width: 100%; height: 600px")
      gmap-marker(
        v-for="(item, index) in $store.state.events"
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
        div(v-html="infoContent")
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Map',
  props: {
    facility: {
      type: String,
      default: 'events',
    },
    apiPath: {
      type: String,
      default: 'events',
    },
  },
  data: () => ({
    statusText: '',
    center: { lat: -3.350235, lng: 111.995865 },
    markers: [
      { position: { lat: -0.48585, lng: 117.1466 } },
      { position: { lat: -6.9127778, lng: 107.6205556 } },
    ],
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
    map: null,
    infoContent: '',
  }),
  computed: {
    ...mapState({
      data: (state) => state.events,
      isLoading: (state) => state.isLoading,
    }),
    getCenter() {
      return this.formatLocation(this.$store.state.events[0]?.location)
    },
  },
  beforeMount() {
    this.getData({ facility: this.facility, path: this.apiPath })
  },
  mounted() {
    this.$refs.gmap.$mapPromise.then((map) => {
      const bounds = new google.maps.LatLngBounds()
      for (const m of this.$store.state.events) {
        bounds.extend(this.formatLocation(m.location))
      }
      map.fitBounds(bounds)
    })
  },
  methods: {
    ...mapActions({
      getData: 'getData',
    }),
    formatLocation(location) {
      if (!location) return {}
      const split = location.split(',')
      return { lat: +split[0], lng: +split[1] }
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = this.formatLocation(marker.location)
      this.infoContent = this.getInfoWindowContent(marker)
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },

    getInfoWindowContent(marker) {
      return `<div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${marker.title}</p>
            </div>
          </div>
          <div class="content">
            ${marker.description}
            <br>
            Start: <time datetime="2016-1-1">${marker.start_date}</time></br>
            End: <time datetime="2016-1-1">${marker.end_date}</time>
          </div>
          <div class="action">
            <button>Order now!</button>
          </div>
        </div>
      </div>`
    },
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
