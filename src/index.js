// import necessary modules
const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const slugify = require("./slugify");
const path = require("path");
const generator = require("generate-password");

const UsersSchema = require("./lists/Users.js");
const PaymentsSchema = require("./lists/Payments.js");
const GroupSchema = require("./lists/Groups.js");
const ItemSchema = require("./lists/Items.js");
const AddressesSchema = require("./lists/Addresses.js");
const OrdersSchema = require("./lists/Orders.js");
const OrderItemsSchema = require("./lists/OrderItems.js");
const ConfigurationsSchema = require("./lists/Configurations.js");
const { SapperApp } = require("keystone-app-sapper");

const logger = require("@keystonejs/logger").logger("tabernus");
var Email = require("keystone-email");
const numbro = require("numbro");
const i18n = require("i18next");
const localization = require("../localization");

// create an instance of Keystone app
const keystone = new Keystone({
  name: "Tabernus",
  cookieSecret: process.env.COOKIE_SECRET || "supersecret",
  secureCookies: false,
  adapter: new MongooseAdapter(),
  onConnect: async () => {
    const users = await keystone.lists.User.adapter.findAll();

    if (!users.length) {
      console.warn("");
      console.warn("=============================");

      const password = generator.generate({
        length: 10,
        numbers: true
      });

      const admin = {
        name: 'Admin',
        email: 'void@void.com',
        password,
        isAdmin: true
      }

      await keystone.createItems({
        User: [admin]
      });

      console.warn(`Admin username: ${admin.email}`);
      console.warn(`Admin password: ${admin.password}`);

      console.warn("=============================");
      console.warn("");
    }

    let configurations = await keystone.lists.Configuration.adapter.findAll();

    if (!configurations.length) {
      logger.info(" Configuration");

      const configurations = require("../data/Configurations.json");

      await keystone.createItems({
        Configuration: configurations
      });
    }

    configurations = await keystone.lists.Configuration.adapter.findAll();
    await localization(configurations[0].language);

    const payments = await keystone.lists.Payment.adapter.findAll();
    if (!payments.length) {
      logger.info(" Payments");
      await keystone.createItems({
        Payment: require("../data/Payments.json")
      });
    }

    const groups = await keystone.lists.Group.adapter.findAll();
    if (!groups.length) {
      logger.info(" Groups");
      const groups = require("../data/Groups.json");
      const groupMap = {};

      for (let i = 0; i < groups.length; i++) {
        const name = slugify(groups[i].name);
        let groupName = name;
        if (groupMap[name]) {
          groupName += `-${groupMap[name]}`;
        } else {
          groupMap[name] = 0;
        }

        groupMap[name]++;
        groups[i].slug = groupName;
      }

      await keystone.createItems({
        Group: groups
      });
    }

    const items = await keystone.lists.Item.adapter.findAll();
    if (!items.length) {
      logger.info(" Items");
      const items = require("../data/Items.json");

      for (let i = 0; i < items.length; i++) {
        items[i].slug = slugify(`${items[i].code} ${items[i].name}`);
      }

      await keystone.createItems({
        Item: items
      });
    }
  }
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User"
});

keystone.createList("User", UsersSchema);
keystone.createList("Payment", PaymentsSchema);
keystone.createList("Group", GroupSchema);
keystone.createList("Item", ItemSchema);
keystone.createList("Address", AddressesSchema);
keystone.createList("Order", OrdersSchema);
keystone.createList("OrderItem", OrderItemsSchema);
keystone.createList("Configuration", ConfigurationsSchema);

function sendEmail(email, locals, options) {
  return new Promise((resolve, reject) => {
    email.send(locals, options, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const sendConfirmationEmail = async (_, { data }) => {
  const { Order, OrderItem, Payment, Address } = keystone.lists;

  // Not sure why Order.adapter.findById doesn't return `items` so I have to
  // query it directly from Mongoose
  const order = await Order.adapter.mongoose.models.Order.findById(data);

  const payment = await Payment.adapter.findById(order.payment);
  const invoicingAddress = await Address.adapter.findById(
    order.invoicingAddress
  );
  const deliveryAddress = order.deliveryAddress
    ? await Address.adapter.findById(order.deliveryAddress)
    : undefined;

  const orderItems = await Promise.all(
    order.items.map(id => OrderItem.adapter.findById(id))
  );

  logger.info(`Sending email for order ${data} [${orderItems.length}] items`);

  const email = new Email("templates/order.pug", { transport: "mailgun" });
  const configuration = await keystone.lists.Configuration.adapter.findAll()[0];
  const locals = {
    invoicingAddress,
    deliveryAddress,
    payment,
    order,
    orderItems,
    config: configuration,
    numbro,
    t: i18n.t.bind(i18n)
  };

  email.render(locals, (err, res) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info(res);
    }
  });

  await sendEmail(email, locals, {
    from: configuration.emailFrom,
    to: deliveryAddress ? deliveryAddress.email : invoicingAddress.email,
    bcc: configuration.emailBcc,
    subject: i18n.t("orderConfirmation.subject")
  });

  return order.id;
};

keystone.extendGraphQLSchema({
  mutations: [
    {
      schema: `sendConfirmationEmail(data: ID!): ID`,
      resolver: sendConfirmationEmail
    }
  ]
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp({
      apollo: {
        cacheControl: {
          defaultMaxAge: 60 * 60 // One hour max-age
        }
      }
    }),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy
    }),
    new SapperApp({
      skipDevelopmentBuild: true,
      path: path.resolve(__dirname, "../__sapper__/dev"),
      buildOptions: {
        routes: "src/app/routes",
        src: "src/app"
      }
    })
  ]
};
