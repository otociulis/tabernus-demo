import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import pug from "pug";
import nodeFetch from "node-fetch";

import { websiteAddress } from "./headers";
import {
  sitemapGroupsLoader,
  sitemapItemsLoader,
  configLoader
} from "./loaders";

const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV !== "production";

const ssrLoader = {
  fetch: (url, init) => {
    if (!dev) {
      if (!websiteAddress) {
        console.warn(`WEBSITE_ADDRESS environment variable is not set!`);
      }
    }
    const realUrl = dev ? url : `${websiteAddress}/${url}`;

    return nodeFetch(realUrl, init);
  }
};

const configurationMiddleware = (req, _, next) => {
  configLoader(ssrLoader).then(result => {
    req.config = result.data.config[0];
    next();
  });
};

function start() {
  const app = express();

  app.get("/sitemap.xml", async (req, res) => {
    try {
      res.set("Content-Type", "text/xml");

      const result = await sitemapGroupsLoader(ssrLoader);
      const { groups } = result.data;
      let items = [];

      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];

        const itemsResult = await sitemapItemsLoader(ssrLoader, group.slug);
        const groupItems = itemsResult.data.items.map(i => ({
          ...i,
          group
        }));

        items = items.concat(groupItems);
      }

      const template = pug.compileFile("templates/sitemap.pug", {});

      res.send(
        template({
          websiteAddress,
          groups,
          items
        })
      );
    } catch (ex) {
      console.error(ex);
      res.json(ex);
    }
  });

  app.use(
    configurationMiddleware,
    compression({ threshold: 0 }),
    sirv("static", { dev }, { maxAge: 60 * 60 * 24, etag: true }),
    sapper.middleware({
      session: (req) => {
        return {
          config: req.config
        };
      }
    })
  );

  return app;
}

if (dev) {
  start().listen(PORT, err => {
    if (err) console.log("error", err);
  });
}

export default start;
