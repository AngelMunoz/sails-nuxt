/**
 * nuxt config and init
 */
const { Nuxt, Builder } = require('nuxt');

// Require Nuxt config
const config = require('../nuxt.config');

// Create a new Nuxt instance
const nuxt = new Nuxt(config);

// Enable live build & reloading on dev
if (nuxt.options.dev) {
  new Builder(nuxt).build();
}

module.exports = { nuxt };
