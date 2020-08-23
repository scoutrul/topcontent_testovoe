<template lang="pug">
  section.section
    Map(:facility="facility" :apiPath="apiPath")
</template>

<script>
import { mapActions } from 'vuex'
import Map from '@/components/Map'
export default {
  name: 'Index',
  components: { Map },
  data: () => ({
    facility: 'events',
    apiPath: 'events',
  }),

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
