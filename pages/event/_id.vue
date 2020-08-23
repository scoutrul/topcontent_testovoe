<template lang="pug">
  section.section
    button(@click="$router.push('/')") to map
    h1 hi
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'Event',
  data: () => ({
    facility: 'event',
    apiPath: 'events',
  }),
  computed: {
    ...mapState({
      data(state) {
        return state[`${this.facility}/${this.$route.params.id}`]
      },
      isLoading: (state) => state.isLoading,
    }),
  },
  mounted() {
    this.getData({
      facility: `${this.facility}/${this.$route.params.id}`,
      path: `${this.apiPath}/${this.$route.params.id}`,
    })
  },
  methods: {
    ...mapActions({
      getData: 'getData',
    }),
  },
}
</script>
