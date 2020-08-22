<template lang="pug">
  section.section
    Map(:facility="facility" :apiPath="apiPath")
</template>

<script>
import Map from '@/components/Map'
import { mapState, mapActions } from 'vuex'
export default {
  components: { Map },
  name: 'Events',
  data: () => ({
    facility: 'events',
    apiPath: 'events',
  }),
}
</script>
