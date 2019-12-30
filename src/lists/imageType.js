const { CloudinaryImage } = require("@keystonejs/fields");
const { CloudinaryAdapter } = require("@keystonejs/file-adapters");
const url = require("url");

const cloudinaryUrl = url.parse(
  process.env["CLOUDINARY_URL"] || "cloudinary://foo:bar@localhost"
);

module.exports = {
  type: CloudinaryImage,
  adapter: new CloudinaryAdapter({
    cloudName: cloudinaryUrl.hostname,
    apiKey: cloudinaryUrl.auth.split(":")[0],
    apiSecret: cloudinaryUrl.auth.split(":")[1]
  })
}