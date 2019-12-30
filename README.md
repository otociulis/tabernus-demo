# Tabernus

Click [here](https://tabernus-demo.herokuapp.com/) for demo website and [here](https://tabernus-demo.herokuapp.com/admin) for demo read-only admin UI with following credentials:

Username: `admin`
Password: `p4$$w0rd`

Goal of Tabernus is to provide baseline e-shop website that can be run on free hosting services but offering rich feature set including:

* [x] Persistence layer - [MongoDB](https://www.mongodb.com/) and [Mongoose ODM](https://mongoosejs.com/)
* [x] Data management - [KeystoneJS 5 CMS](https://www.keystonejs.com/)
* [x] Data queries - [Appolo GraphQL](https://www.apollographql.com/)
* [x] UI customization - [Bootstrap 3 controls](https://getbootstrap.com/docs/3.4/) and [LESS templates](http://lesscss.org/)
* [x] Fast and scalable web components - [Svelte UI web framework](https://svelte.dev/)
* [x] Support of server-side rendering - [Sapper web framework](https://sapper.svelte.dev/)
* [x] Internationalization & localization - [i18next](https://www.i18next.com/) and [Numbro](http://numbrojs.com/)
* [x] Email integration & templating - [Keystone.Email](https://www.npmjs.com/package/keystone-email)
* [x] [Open Graph](https://ogp.me/) and [LD-JSON](https://json-ld.org/) integration
* [x] Cart
* [x] Sitemap generator
* [x] Data caching
* [x] Google Analytics
* [x] Initial data seeding
* [x] Nested groups, searching, sorting, filtering, grid & list view, item details ...

# Deployment scenario

Whole system can be deployed and hosted on free tiers of following services which makes it ideal for small businesses and can scale easily:

* [Heroku](https://www.heroku.com) with Mailgun addon
* [MongoDB Cloud](https://cloud.mongodb.com/)
* [Cloudinary](https://cloudinary.com/)

# Development process

# Production build

To build the production version of the site:

```
yarn build:keystone
```

Before launching the website make sure that following environment variables are set:

* `CLOUDINARY_URL` - Cloudinary login data in format `cloudinary://<apiKey>:<apiSecret>`
* `COOKIE_SECRET` - secret cookie value (see [here](https://www.keystonejs.com/guides/production#cookie-secret) for details)
* `GOOGLE_ANALYTICS_ID` - Google analytics ID
* `MONGODB_URL` - MongoDB connection string
* `NODE_ENV=production`
* `PORT` - port of the server, set to `3000` for localhost testing
* `WEBSITE_ADDRESS` - URL of server, for locahost testing set to `http://localhost:3000`

To launch the website use command:

```
yarn start
```

* [ ] Remove data seed
