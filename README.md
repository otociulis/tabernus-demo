# Tabernus

All code for demo website can be found in 
[tabernus-demo](https://github.com/otociulis/tabernus-demo) repository.

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
* [ ] Responsive design
* [ ] Paging

# Deployment guide

Whole system can be deployed and hosted on free tiers of following services 
which makes it ideal for small businesses and can scale easily:

* [Heroku](https://www.heroku.com) with Mailgun addon
* [MongoDB Cloud](https://cloud.mongodb.com/)
* [Cloudinary](https://cloudinary.com/)

Follow the step-by-step [guide](./DEPLOYMENT.md) for instructions on how to 
configure and setup the system.

# Development guide

Prerequisites:

* [Node.js 12.14 LTS](https://nodejs.org/en/)
* [Yarn package manager](https://yarnpkg.com/lang/en/)
* [MongoDB](https://www.mongodb.com/)

Start by forking this repository and installing the dependencies (make sure 
that your `NODE_ENV` is **NOT** set to `production`):

```
yarn install
```

Next, build the development version of the website:

```
yarn build:sapper
```

In case that you want to use custom database set environment variable 
`MONGODB_URL` to desired value:

```
MONGODB_URL=mongodb://localhost:27017/tabernus-custom
```

And start the backend:

```
yarn start
```

When application starts for the first time it will generate admin user account
that can be used to log into the Keystone instance. Look for following lines 
in the console:

```
Connecting to database
=============================
Admin username: void@void.com
Admin password: <password>
=============================
```

In case that you forget the password delete `users` collection in the database
and restart the application.

After application starts log in into administrator console by opening following
URL in the browser `http://localhost:3000/admin` - use user name and password
from section above and change/add more admin users.

Start e-shop frontend (keep backend running):

```
yarn start:dev
```

And navigate to URL (notice different port number) `http://localhost:3001`. You
should be greeted with default landing page. Congratulations - now you can
continue with [customization](./CUSTOMIZATION.md).

# Production build

To build the production version of the site:

```
yarn build:keystone
```

Before launching the website make sure that following environment variables are set:

* `CLOUDINARY_URL` - Cloudinary login data in format `cloudinary://<apiKey>:<apiSecret>`
* `COOKIE_SECRET` - secret cookie value (see 
[here](https://www.keystonejs.com/guides/production#cookie-secret) for details)
* `GOOGLE_ANALYTICS_ID` - Google analytics ID
* `MONGODB_URL` - MongoDB connection string
* `NODE_ENV=production`
* `PORT` - port of the server, set to `3000` for localhost testing
* `WEBSITE_ADDRESS` - URL of server, for locahost testing set to 
`http://localhost:3000`

To launch the website use command:

```
yarn start
```

