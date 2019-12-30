const { Text, Relationship, Slug } = require("@keystonejs/fields");
const { DateTimeUtc } = require("@keystonejs/fields-datetime-utc");

const moment = require("moment");
const { adminOnlyAccess } = require('./acl');

module.exports = {
  access: {
    read: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: adminOnlyAccess,
  },
  fields: {
    number: {
      type: Slug,
      isRequired: true,
      isUnique: true,
      generate: ({ resolvedData, existingItem }) => {
        let { createdAt } = resolvedData;
        createdAt = createdAt || existingItem.createdAt;
        const date = moment(createdAt);

        return date.format("YYYY-MM-DD-HH-mm-ss");
      }
    },
    createdAt: {
      type: DateTimeUtc,
      isRequired: true,
      defaultValue: () => { return new Date().toUTCString(); }
    },
    payment: {
      type: Relationship,
      isRequired: true,
      ref: "Payment"
    },
    companyName: {
      type: Text
    },
    companyIdentificationNumber: {
      type: Text
    },
    taxpayerIdentificationNumber: {
      type: Text
    },
    VATIdentificationNumber: {
      type: Text
    },
    invoicingAddress: {
      type: Relationship,
      isRequired: true,
      ref: "Address"
    },
    deliveryAddress: {
      type: Relationship,
      ref: "Address"
    },
    items: {
      type: Relationship,
      ref: "OrderItem",
      many: true
    }
  }
};
