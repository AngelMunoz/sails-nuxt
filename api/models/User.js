/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      required: true
    }

  },

};

