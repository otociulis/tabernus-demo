const { Text } = require("@keystonejs/fields");
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
    surname: {
      type: Text,
      isRequired: true
    },
    phone: {
      type: Text,
      isRequired: true
    },
    email: {
      type: Text,
      isRequired: true
    },
    street: {
      type: Text,
      isRequired: true
    },
    zip: {
      type: Text,
      isRequired: true
    },
    city: {
      type: Text,
      isRequired: true
    }
  }
};
