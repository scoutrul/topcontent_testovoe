export default {
  mode: 'spa',
  target: 'static',
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    GMAP_KEY: process.env.GMAP_KEY,
    TOKEN: process.env.TOKEN,
  },
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

  plugins: ['@/plugins/google-maps', '~/plugins/toast'],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],

  modules: ['nuxt-buefy', '@nuxtjs/axios'],

  axios: {
    baseURL: process.env.BASE_URL,
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
      Authorization: process.env.TOKEN,
    },
  },

  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  },
}
