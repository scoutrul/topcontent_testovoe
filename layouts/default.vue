<template lang="pug">
  section.content
    .container.mt-10
      b-navbar
        template(slot="brand")
          b-button(type="is-warning" outlined @click="$router.push('/')" v-if="$route.path !== '/'") MAP
    nuxt
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
    }),
  },
}
</script>
