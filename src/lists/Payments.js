const { Text, Float } = require('@keystonejs/fields');
const { adminOnlyAccess } = require('./acl');

module.exports = {
  access: {
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    price: {
      type: Float,
      isRequired: true      
    },
  },
}