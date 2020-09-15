<template lang="pug">
  section
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
    this.updateData()
  },
  methods: {
    ...mapActions({
      getData: 'getData',
    }),
    async updateData() {
      await this.getData({ facility: this.facility, path: this.apiPath })
    },
  },
}
</script>
