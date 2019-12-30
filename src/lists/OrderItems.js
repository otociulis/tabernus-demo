const { Text, Float, Relationship } = require("@keystonejs/fields");
const { adminOnlyAccess } = require('./acl');

module.exports = {
  access: {
    read: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: {
    name: {
      type: Text,
      isRequired: true
    },
    code: {
      type: Text,
      isRequired: true
    },
    price: {
      type: Float,
      isRequired: true
    },
    priceWithVAT: {
      type: Float,
      isRequired: true
    },
    measurement: {
      type: Text
    },
    count: {
      type: Float,
      isRequired: true,
      defaultValue: 1
    }
  }
};
