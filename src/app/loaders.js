import mem from "mem";

const { env } = typeof process !== "undefined" ? process : { env: {} };

const url =
  (env.NODE_ENV === "production" ? "" : "http://localhost:3000/") + "admin/api";
const maxAge = 60 * 1000; // * 60 * 1000, // One hour maxAge

function childGroupsQuery(name, filter) {
  return `${name}: allGroups(where: { ${filter} } orderBy: "name_ASC") { name, slug }`;
}

const navbarQueries = [
  `onSaleItems: _allItemsMeta(where: { onSale: true }) { count }`,
  `newItems:_allItemsMeta(where: { newItem: true }) { count }`,
  childGroupsQuery("topLevelGroups", "parent_is_null: true")
];

const itemFields =
  "name, slug, description, price, priceWithVAT, code, onSale, newItem" +
  ", measurement, hidden, count, image { publicUrl }, group { slug }";

function itemsQuery(filter) {
  return `items: allItems(where: { ${filter} } orderBy: "name_ASC") {
    ${itemFields}
  }`;
}

function itemQuery() {
  return `items: allItems(where: { OR: [{ slug: $item_slug }, { slug_ends_with: $item_slug }] } ) { 
    ${itemFields}
  }`;
}

function searchQuery() {
  return `items: allItems(
    first: 10, where: {
      OR: [{ name_contains_i: $keyword }, { code_contains_i: $keyword }, { description_contains_i: $keyword }]
    }
  ) { slug, name, code, group { slug } }
  groups: allGroups(first: 10, where: { name_contains_i: $keyword }) {
    name, slug
  }`;
}

function configQuery() {
  return (
    `config: allConfigurations(first: 1) { firmName, street, zipCode,` +
    ` town, telNumberPrefix, telNumber, email, ICO, ICDPH, ICDPHPrefix,` +
    ` showPriceWithVAT, showNavigator, showSubGroups, showMeasurement,` +
    ` numberOfRowSubGroups, name, landingPageImage { publicUrl }, ` +
    ` landingPageText, language, aboutPageHeader, termsAndConditions, ` +
    ` googleAnalyticsId, emailFrom, emailBcc, shortDescriptionLength, ` +
    ` aboutPageFooter, keywords }`
  );
}

function searchItemsQuery() {
  return `items: allItems(
    where: {
      OR: [{ name_contains_i: $keyword }, { code_contains_i: $keyword }]
    }
  ) { ${itemFields} }
  `;
}

function groupHierarchyQuery(levels) {
  let body = "";
  for (let i = 0; i < levels; i++) {
    body = `parent { slug, name, ${body} }`;
  }

  return `groupHierarchy: allGroups(where: { slug: $group_slug }) { ${body} }`;
}

async function fetchQuery(preload, query, options) {
  let queryDef = "";
  let operationName = undefined;
  let variables = undefined;

  if (options) {
    const { name, params } = options;
    variables = {};

    for (let i = 0; i < params.length; i++) {
      const { id, type, value } = params[i];
      queryDef += queryDef.length === 0 ? "" : ", ";
      queryDef += `$${id}: ${type}`;

      variables[id] = value;
    }

    queryDef = `${name} (${queryDef})`;
  }

  query = `query ${queryDef} { ${query} }`;

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ query, operationName, variables })
  };

  let response;

  try {
    if (typeof preload !== "undefined") {
      response = await preload.fetch(url, init);
    } else {
      response = await fetch(url, init);
    }

    const result = await response.json();

    return { ...result };
  } catch (ex) {
    throw ex;
  }
}

export async function postMutation(name, type, results, data) {
  results = results ? `{ ${results} }` : "";
  const query = `mutation ${name}(\$data: ${type}) {${name}(data: \$data) ${results} }`;
  const body = JSON.stringify({
    query,
    operationName: name,
    variables: { data }
  });

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body
  });

  const result = await response.json();
  return result.data[name];
}

export const newItemsGroupLoader = mem(
  loader =>
    fetchQuery(loader, navbarQueries.concat(itemsQuery("newItem: true"))),
  {
    maxAge,
    cacheKey: () => 1 // Skip first parameter (loader)
  }
);

export const paymentsLoader = mem(
  loader => fetchQuery(loader, `payments: allPayments { id, name, price}`),
  {
    maxAge,
    cacheKey: () => 1 // Skip first parameter (loader)
  }
);

export const onSaleGroupLoader = mem(
  loader =>
    fetchQuery(loader, navbarQueries.concat(itemsQuery("onSale: true"))),
  {
    maxAge,
    cacheKey: () => 1 // Skip first parameter (loader)
  }
);

export const landingPageGroupLoader = mem(
  loader =>
    fetchQuery(
      loader,
      navbarQueries.concat(itemsQuery("showOnLandingPage: true"))
    ),
  {
    maxAge,
    cacheKey: () => 1 // Skip first parameter (loader)
  }
);

export const configLoader = mem(loader => fetchQuery(loader, configQuery()), {
  maxAge,
  cacheKey: () => 1 // Skip first parameter (loader)
});

export const groupPeersLoader = mem(
  (loader, slug) =>
    fetchQuery(
      loader,
      childGroupsQuery("children", "parent: { slug: $slug }"),
      {
        name: "groupPeers",
        params: [
          {
            id: "slug",
            type: "String!",
            value: slug
          }
        ]
      }
    ),
  {
    maxAge,
    cacheKey: _arguments => _arguments[1]
  }
);

export const groupLoader = mem(
  (loader, slug) =>
    fetchQuery(
      loader,
      navbarQueries.concat(
        itemsQuery(`group: { slug: $group_slug }`),
        `groups: allGroups(first: 1 where: {slug: $group_slug } ) { slug, name, description }`,
        `childGroups: allGroups(where: { parent: { slug: $group_slug } }) { name, slug }`,
        groupHierarchyQuery(3)
      ),
      {
        name: "groupDetails",
        params: [
          {
            id: "group_slug",
            type: "String!",
            value: slug
          }
        ]
      }
    ),
  {
    maxAge,
    cacheKey: _arguments => _arguments[1]
  }
);

export const itemLoader = mem(
  (loader, item_slug, group_slug) => {
    const params = [
      {
        id: "item_slug",
        type: "String!",
        value: item_slug
      }
    ];

    if (group_slug) {
      params.push({
        id: "group_slug",
        type: "String!",
        value: group_slug
      });
    }

    return fetchQuery(
      loader,
      navbarQueries.concat(
        itemQuery(),
        group_slug ? groupHierarchyQuery(3) : undefined
      ),
      {
        name: "itemDetails",
        params
      }
    );
  },
  {
    maxAge,
    cacheKey: _arguments => _arguments[1]
  }
);

export const searchLoader = mem(
  (loader, keyword) => {
    const params = [
      {
        id: "keyword",
        type: "String!",
        value: keyword
      }
    ];

    return fetchQuery(loader, searchQuery(), {
      name: "search",
      params
    });
  },
  {
    maxAge,
    cacheKey: _arguments => _arguments[1]
  }
);

export const searchItemsLoader = mem(
  (loader, keyword) => {
    const params = [
      {
        id: "keyword",
        type: "String!",
        value: keyword
      }
    ];

    return fetchQuery(loader, searchItemsQuery(), {
      name: "searchItems",
      params
    });
  },
  {
    maxAge,
    cacheKey: _arguments => _arguments[1]
  }
);

export const sitemapGroupsLoader = mem(
  loader => {
    return fetchQuery(loader, `groups: allGroups { slug }`);
  },
  {
    maxAge,
    cacheKey: () => 1
  }
);

export const sitemapItemsLoader = mem(
  (loader, slug) => {
    return fetchQuery(
      loader,
      `items: allItems(where: { group: { slug: $group_slug } }) { slug }`,
      {
        name: "sitemapItems",
        params: [
          {
            id: "group_slug",
            type: "String!",
            value: slug
          }
        ]
      }
    );
  },
  {
    maxAge,
    cacheKey: () => 1
  }
);
