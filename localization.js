const resources = {
  en: {
    translation: {
      catalog: {
        title: "Catalog | {{firmName}}"
      },
      topbar: {
        about: "About",
        catalog: "Catalog",
        termsAndConditions: "Terms & Conditions",
        basket: "Cart",
        logout: "Log out",
        orders: "Orders",
        searchPlaceholder: "Search"
      },
      about: {
        title: "About | {{firmName}}",
        phone: {
          contactInfo: "Contact information",
          title: "Phone number"
        },
        email: {
          title: "Email"
        },
        phoneNumberFormat: "{{telNumberPrefix}} {{telNumber}}",
        invoicing: "Invoicing",
        companyIdentificationNumber: {
          abbreviation: "CIN",
          title: "Company Identification Number"
        },
        taxpayerIdentificationNumber: {
          abbreviation: "TIN",
          title: "Taxpayer Identification Number"
        },
        VATIdentificationNumber: {
          abbreviation: "VATIN",
          title: "Value Added Tax Identification Number"
        }
      },
      termsAndConditions: {
        title: "Terms & Conditions | {{firmName}}",
        header: "Terms & Conditions"
      },
      navbar: {
        catalog: "Catalog"
      },
      virtualGroup: {
        on_sale: "On Sale",
        new_items: "New arrivals"
      },
      catalogLanding: {
        newItems: "New arrivals",
        itemsOnSale: "Items on sale",
        recommended: "Recommended"
      },
      items: {
        title: "{{name}} | {{firmName}}",
        header: {
          code: "Code",
          name: "Name",
          price: "Price",
          priceWithVAT: "Price",
          unitOfMeasurement: "Unit of measurement: {{measurement}}"
        },
        addToBasket: "Add to cart",
        itemOnSale: "Item on sale",
        newItem: "New item",
        showInList: "Show items in list",
        showInGrid: "Show items in grid",
        showAllItems: "Show all items",
        priceWithoutVAT: "{{price}} w/o VAT",
        itemsAvailable: "✔ AvailableSkladom",
        itemsNotAvailable: "✖ N/A",
        sortNameAscending: "By name ascending",
        sortNameDescending: "By name descending",
        sortPriceAscending: "By price ascending",
        sortPriceDescending: "By price descending"
      },
      searchResults: {
        title: "Search results | {{firmName}}",
        header: "Search results",
        noItemsFound: "No items matching entered criteria found"
      },
      itemDetail: {
        title: "{{name}} | {{firmName}}",
        code: "Item code:",
        availability: "Availability:",
        priceWithoutVAT: "Price without VAT:",
        pricePerMeasurementUnit: "{{price}} per {{measurement}}",
        pricePerUnit: "Price:",
        description: "Description"
      },
      filters: {
        list: "Filters",
        onlyOnSale: "Only items on sale",
        onlyNewItems: "Only new items",
        onlyAvailable: "Only available"
      },
      basket: {
        title: "Cart | {{firmName}}"
      },
      basketItems: {
        summary: "Summary",
        subtotal: "Subtotal:",
        payment: "Shipping:",
        total: "Total:",
        header: "Cart",
        pricePerItem: "{{price}} per {{measurement}}",
        checkout: "Proceed to checkout",
        paymentPrice: "{{name}} ({{price}})",
        noItemsFound: "No items in the cart",
        continueShopping: "Continue shopping"
      },
      checkout: {
        title: "Checkout | {{firmName}}",
        header: "Checkout",
        placeOrder: "Place order",
        invoicingAddress: "Invoicing address",
        deliveryAddress: "Delivery address",
        name: "Name",
        surname: "Surname",
        phone: "Phone number",
        email: "E-mail",
        street: "Street",
        city: "City",
        zip: "Zip code",
        privatePurchase: "Private party purchase",
        companyPurchase: "Company purchase",
        deliverToDifferentAddress: "Deliver to different address",
        orderPlacedHeader: "Order succesfully placed!",
        orderPlaced:
          "Your order has been succesfully placed and you should receive confirmation email to provided address shortly.",
        company: "Company name",
        companyIdentificationNumber: "Company Identification Number",
        taxpayerIdentificationNumber: "Taxpayer Identification Number",
        VATIdentificationNumber: "VAT Identification Number"
      },
      validation: {
        isEmpty: "This field cannot be empty"
      },
      notFound: {
        title: "Page not found | {{firmName}}",
        header: "We are sorry, the page you requested cannot be found.",
        text:
          "The URL may be misspelled or the page you're looking for is no longer available."
      },
      orderConfirmation: {
        title: "Thank you for your order no. {{number}}",
        listOfItems: "List of the ordered items:",
        header: {
          count: "Count",
          total: "Total"
        },
        total: {
          withoutVAT: "Total w/o VAT",
          withVAT: "Total"
        },
        subject: "Order confirmation"
      }
    }
  },
  sk: {
    translation: {
      catalog: {
        title: "Katalóg | {{firmName}}"
      },
      topbar: {
        about: "O nás",
        catalog: "Katalóg",
        termsAndConditions: "Obchodné podmienky",
        basket: "Košík",
        searchPlaceholder: "Vyhľadávanie",
        logout: "Odhlásenie",
        orders: "Objednávky"
      },
      about: {
        title: "O nás | {{firmName}}",
        phone: {
          contactInfo: "Kontakt",
          title: "Kontakt"
        },
        email: {
          title: "Email"
        },
        phoneNumberFormat: "{{telNumberPrefix}} {{telNumber}}",
        invoicing: "Fakturačné údaje",
        companyIdentificationNumber: {
          abbreviation: "IČO",
          title: "Identifikačné číslo organizácie"
        },
        taxpayerIdentificationNumber: {
          abbreviation: "DIČ",
          title: "Daňové Identifikačné číslo"
        },
        VATIdentificationNumber: {
          abbreviation: "IČ DPH",
          title: "Identifikačné číslo pre daň z pridanej hodnoty"
        }
      },
      termsAndConditions: {
        title: "Obchodné podmienky | {{firmName}}",
        header: "Obchodné podmienky"
      },
      navbar: {
        catalog: "Katalóg"
      },
      virtualGroup: {
        on_sale: "Výpredaj",
        new_items: "Novinky"
      },
      catalogLanding: {
        newItems: "Novinky",
        itemsOnSale: "Výpredaj",
        recommended: "Odporúčame"
      },
      items: {
        title: "{{name}} | {{firmName}}",
        header: {
          code: "Kód",
          name: "Názov",
          price: "Cena",
          priceWithVAT: "Cena",
          unitOfMeasurement: "Merná jednotka: {{measurement}}"
        },
        addToBasket: "Do košíka",
        itemOnSale: "Výpredaj",
        newItem: "Novinka",
        showInList: "Zobraziť položky v zozname",
        showInGrid: "Zobraziť položky v mriežke",
        showAllItems: "Zobraziť všetko",
        priceWithoutVAT: "{{price}} bez DPH",
        itemsAvailable: "✔ Skladom",
        itemsNotAvailable: "✖ Nie je skladom",
        sortNameAscending: "Podľa názvu vzostupne",
        sortNameDescending: "Podľa názvu zostupne",
        sortPriceAscending: "Od najlacnejšieho",
        sortPriceDescending: "Od najdrahšieho"
      },
      searchResults: {
        title: "Výsledky vyhľadávania | {{firmName}}",
        header: "Výsledky vyhľadávania: {{keyword}}",
        noItemsFound: "Nebola nájdená žiadna vyhovujúca položka"
      },
      itemDetail: {
        title: "{{name}} | {{firmName}}",
        code: "Kód položky:",
        availability: "Dostupnosť:",
        priceWithoutVAT: "Cena bez DPH:",
        pricePerMeasurementUnit: "{{price}} / {{measurement}}",
        pricePerUnit: "Cena:",
        description: "Popis",
        backToGroup: "Do skupiny"
      },
      filters: {
        list: "Filtre",
        onlyOnSale: "Iba akciové položky",
        onlyNewItems: "Iba novinky",
        onlyAvailable: "Iba položky skladom"
      },
      basket: {
        title: "Košík | {{firmName}}"
      },
      basketItems: {
        header: "Košík",
        pricePerItem: "{{price}} / {{measurement}}",
        summary: "Sumarizácia",
        subtotal: "Medzisúčet:",
        checkout: "Pokračovať v objednávke",
        payment: "Doprava:",
        total: "Spolu:",
        paymentPrice: "{{name}} ({{price}})",
        noItemsFound: "V košíku sa nenachádzajú žiadne položky",
        continueShopping: "Pokračovať v nákupe"
      },
      checkout: {
        title: "Dokončenie objednávky | {{firmName}}",
        header: "Objednávka",
        invoicingAddress: "Fakturačná adresa",
        deliveryAddress: "Dodacia adresa",
        name: "Meno",
        surname: "Priezvisko",
        phone: "Telefónne číslo",
        email: "E-mail",
        street: "Ulica a popisné číslo",
        city: "Mesto",
        zip: "Poštové smerovacie číslo",
        privatePurchase: "Súkromný nákup",
        companyPurchase: "Firemný nákup",
        deliverToDifferentAddress: "Doručiť na inú adresu",
        placeOrder: "Odoslať objednávku",
        orderPlacedHeader: "Objednávka úspešne vytvorená!",
        orderPlaced:
          "Vaša objednávka číslo {{number}} bola úspešne vytvorená. Počas niekoľkých minút by ste na zadanú adresu mali obdržať informačný email.",
        failedToSendOrder:
          "Vašu objednávku sa nepodarilo vytvoriť. Prosím skúste to znova.",
        company: "Názov firmy",
        companyIdentificationNumber: "IČO",
        taxpayerIdentificationNumber: "DIČ",
        VATIdentificationNumber: "IČ DPH"
      },
      validation: { isEmpty: "Toto pole musí obsahovať hodnotu" },
      notFound: {
        title: "Stránka nenájdená  | {{firmName}}",
        header:
          "Ospravedlňujeme sa, ale stránka, ktorú hľadáte nebola nájdená.",
        text:
          "Adresa stránky bola pravdepodobne premenovaná, odstránená, alebo neexistuje vo Vami zadanom formáte."
      },
      orderConfirmation: {
        title: "Ďakujeme za Vašu objednávku č. {{number}}",
        listOfItems: "Zoznam Vami objednaného tovaru:",
        header: {
          count: "Množstvo",
          total: "Celkom"
        },
        total: {
          withoutVAT: "Spolu bez DPH",
          withVAT: "Spolu"
        },
        subject: "Potvrdenie objednávky"
      }
    }
  }
};

const skLocale = require("numbro/languages/sk-SK");
const i18n = require("i18next");
const numbro = require("numbro");

module.exports = async function(language) {
  language = language || "en";
  await i18n.init({
    lng: language,
    debug: false,
    resources
  });

  skLocale.languageTag = "sk"; // Keep in sync with i18n
  skLocale.currencyFormat.thousandSeparated = false;
  skLocale.currencyFormat.mantissa = 2;
  delete skLocale.currencyFormat.totalLength;

  numbro.registerLanguage(skLocale);
  numbro.setLanguage(language);
};
