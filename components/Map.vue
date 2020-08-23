<template lang="pug">
    gmap-map(
      ref="gmap"
      :center="getCenter"
      :averageCenter="true"
      map-type-id="terrain"
      :zoom="2"
      style="width: 100%; height: 600px")
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
        div(v-html="infoContent")
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
    map: null,
    infoContent: '',
  }),
  computed: {
    ...mapState({
      data(state) {
        return state[this.facility]
      },
      isLoading: (state) => state.isLoading,
    }),
    getCenter() {
      return this.formatLocation(this.data[0]?.location)
    },
  },
  mounted() {
    try {
      this.$refs.gmap &&
        this.$refs.gmap.$mapPromise.then((map) => {
          const bounds = new google.maps.LatLngBounds()
          for (const m of this.$store.state[this.facility]) {
            bounds.extend(this.formatLocation(m.location))
          }
          map.fitBounds(bounds)
        })
    } catch (e) {
      debugger
      console.log(e)
    }
  },
  methods: {
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
