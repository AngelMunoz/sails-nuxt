/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/
    nuxt: function (req, res, next) {
      const Nuxt = require('nuxt');
      const options = require('../nuxt.config');
      options.dev = !(process.env.NODE_ENV === 'production');
      // Instanciate nuxt.js
      const nuxt = new Nuxt(options);
      // Build in development
      if (options.dev) {
        nuxt.build()
          .then(nxt => {
            return next(nxt.render);
          });
      }
    },

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
      'nuxt'
    ],

  },

};
