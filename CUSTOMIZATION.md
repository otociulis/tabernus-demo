# Customization guide

## Configuration

All visible configuration properties can be modified in Admin UI 
(`http://localhost:3000/admin`) on the `Configurations` object. There should 
be always just single `Configuration` entry. Since the configuration data
is cached when the application start please make sure to restart the 
application when you make a change to the values.

In order to be able to upload and use images you need to provide valid 
Cloudinary account information by setting environment variable `CLOUDINARY_URL`.
This variable should be in following format (key and secret can be obtained
from Cloudinary account details page):

```
cloudinary://<apiKey>:<apiSecret>
```

## Look & feel

Tabernus is built on top of [Bootstrap 3](https://getbootstrap.com/docs/3.4/) 
and can be customized by modifying [theme file](./src/less/theme.less). For
example, to change the navigation bar color write following line into this file:

```
@navbar-inverse-bg:                         @brand-primary;
```

## Creating the data

There are two ways how to create the data that will be shown in the application:

* Manual entries via Admin UI
* Bulk import via initial seeding

In both cases following rules applies:

* Groups can create hierarchies via `Parent` property. Groups that doesn't have
`Parent` will be displayed as root level groups
* Each item must belong to exactly one `Group` - in other words, it's not 
possible to have items without group
* Both Groups and Items must have unique identifier called `slug`. This is 
automatically generated from name but it can be changed however it's recommended
to keep it to default value.

There is no limit on the depth of the group hierarchy but consider that it might
be hard for users to navigate in more than 3 levels of hierarchy.

Groups and Items can be created using the Admin UI 
(`http://localhost:3000/admin`) in `Groups` and Items sections respectively. 

