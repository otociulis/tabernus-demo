const { Text, Password, Checkbox } = require('@keystonejs/fields');
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
    },
    email: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    password: {
      type: Password,
      isRequired: true,
    },
    isAdmin: { type: Checkbox },
  }
};