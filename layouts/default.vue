<template lang="pug">
  section.content
    .container.mt-3.ml-2(v-if="$route.path !== '/'")
      b-navbar(:mobile-burger="false")
        template(slot="brand")
          button.button.is-warning(v-if="$route.path !== '/'" @click="$router.push('/')")
            b-icon(icon="map")
            span Map
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
