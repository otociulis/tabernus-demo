const {
  Text,
  Float,
  Relationship,
  Checkbox,
  Slug
} = require("@keystonejs/fields");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");
const slugify = require("../slugify");
const { adminOnlyAccess } = require("./acl");
const ImageType = require("./imageType");

module.exports = {
  access: {
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess
  },
  fields: {
    name: {
      type: Text,
      isRequired: true
    },
    slug: {
      type: Slug,
      generate: ({ resolvedData, existingItem }) => {
        let { code, name } = resolvedData;
        code = code || existingItem.code;
        name = name || existingItem.name;
        return slugify(`${code} ${name}`);
      }
    },
    code: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    price: {
      type: Float,
      isRequired: true
    },
    priceWithVAT: {
      type: Float,
      isRequired: true
    },
    description: {
      type: Wysiwyg
    },
    measurement: {
      type: Text
    },
    count: {
      type: Float,
      isRequired: true,
      defaultValue: 1
    },
    eanCode: {
      type: Text
    },
    hidden: {
      type: Checkbox,
      defaultValue: false
    },
    onSale: {
      type: Checkbox,
      defaultValue: false
    },
    newItem: {
      type: Checkbox,
      defaultValue: true
    },
    showOnLandingPage: {
      type: Checkbox,
      defaultValue: true
    },
    image: ImageType,
    group: {
      type: Relationship,
      ref: "Group"
    }
  }
};
