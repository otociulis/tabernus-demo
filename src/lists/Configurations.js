const { Text, Integer, Checkbox } = require("@keystonejs/fields");
const { adminOnlyAccess } = require("./acl");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");
const ImageType = require("./imageType");

module.exports = {
  access: {
    create: adminOnlyAccess,
    update: adminOnlyAccess,
    delete: false
  },
  label: "Configuration",
  fields: {
    language: {
      type: Text,
      isRequired: true,
      defaultValue: "en"
    },    
    firmName: {
      type: Text,
      isRequired: true
    },
    street: {
      type: Text,
      isRequired: true
    },
    zipCode: {
      type: Text,
      isRequired: true
    },
    town: {
      type: Text,
      isRequired: true
    },
    telNumberPrefix: {
      type: Text,
      isRequired: true
    },
    telNumber: {
      type: Text,
      isRequired: true
    },
    email: {
      type: Text,
      isRequired: true
    },
    ICO: {
      type: Text,
      isRequired: true
    },
    ICDPH: {
      type: Text,
      isRequired: true
    },
    ICDPHPrefix: {
      type: Text,
      isRequired: true
    },
    googleAnalyticsId: {
      type: Text
    },
    showPriceWithVAT: {
      type: Checkbox
    },
    showNavigator: {
      type: Checkbox
    },
    showSubGroups: {
      type: Checkbox
    },
    showMeasurement: {
      type: Checkbox
    },
    shortDescriptionLength: {
      type: Integer,
      defaultValue: 54,
      isRequired: true
    },
    numberOfRowSubGroups: {
      type: Integer,
      defaultValue: 3,
      isRequired: true
    },
    name: {
      type: Text,
      isRequired: true
    },
    keywords: {
      type: Text,
    },
    landingPageImage: ImageType,
    landingPageText: {
      type: Wysiwyg
    },
    aboutPageHeader: {
      type: Wysiwyg      
    },
    aboutPageFooter: {
      type: Wysiwyg      
    },
    termsAndConditions: {
      type: Wysiwyg      
    },
    emailFrom: {
      type: Text,
      isRequired: true,
      defaultValue: "E-shop <dontreply@eshop.com>"
    },
    emailBcc: {
      type: Text
    }
  }
};
