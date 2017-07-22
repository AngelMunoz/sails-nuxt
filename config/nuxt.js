/**
 * nuxt config and init
 */

const Nuxt = require('nuxt');
const options = require('../nuxt.config');
options.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(options);
// Instanciate nuxt.js
if (options.dev) {
  nuxt.build();
}

module.exports = { nuxt };
