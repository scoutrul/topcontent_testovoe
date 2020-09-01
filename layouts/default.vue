<template lang="pug">
  section.content(style="padding: 10px 0;")
    .container.mt-10
      b-navbar(:mobile-burger="false")
        template(slot="brand")
          b-button(type="is-warning" size="is-large" @click="$router.push('/')" v-if="$route.path !== '/'").button MAP
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

<style scoped>
.button {
  margin: 10px auto 20px auto;
}
</style>
