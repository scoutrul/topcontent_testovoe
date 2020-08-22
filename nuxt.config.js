export default {
  mode: 'spa',
  target: 'static',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: ['@/plugins/google-maps', '~/plugins/notify.js'],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],

  modules: ['nuxt-buefy', '@nuxtjs/toast', '@nuxtjs/axios'],

  toast: {
    position: 'top-center',
    duration: 5000,
  },
  axios: {
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
      post: {
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
      Authorization: `Bearer TMprlXmuupP1pSFpfS49nWyrniQiLEQ6wJVhR1avsLGfjRPDS4We0WHlVB3kkxje16tx4PMQ4GPfX5fb`,
    },
  },
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  },
}
