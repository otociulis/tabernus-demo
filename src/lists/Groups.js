const { Text, Slug, Float, Relationship, Integer } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const slugify = require("../slugify");
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
      isRequired: true
    },
    description: {
      type: Wysiwyg      
    },
    discount: {
      type: Float,
      defaultValue: 0.0
    },
    parent: {
      type: Relationship,
      ref: 'Group'
    },
    importId: {
      type: Integer,
      hidden: true
    },
    slug: {
      type: Slug,
      generate: ({ resolvedData, existingItem }) => {
        let { name } = resolvedData;
        name = name || existingItem.name;
        return slugify(name)
      }
    }
  },
}