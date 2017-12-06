module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  srcDir: 'client/',
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify', 'axios'],
  },
  modules: ['@nuxtjs/axios'],
  plugins: [
    { src: '~plugins/vue-socket.io.js', ssr: false },
    '~plugins/vuetify.js'
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ],
  axios: {
    baseUrl: 'http://localhost:1337'
  }
};
