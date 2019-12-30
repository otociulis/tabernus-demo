import { groupPeersLoader } from "./loaders";

export const onSaleGroupId = "on_sale";
export const newItemsGroupId = "new_items";
export const recommendedGroupId = "recommended";

export function groupLink(slug) {
  return `/catalog/${slug}/items`;
}

export function itemLink(item) {
  return `/catalog/${item.group.slug}/item/${item.slug}`;
}

export async function expandedGroups(loader, groupHierarchy) {
  let expandedGroups = [];

  if (groupHierarchy.length > 0) {
    let parentGroup = groupHierarchy[0].parent;

    while (parentGroup) {
      const { name, slug, parent } = parentGroup;
      const childrenData = await groupPeersLoader(loader, slug);

      expandedGroups.unshift({ name, slug, ...childrenData.data });
      parentGroup = parent;
    }
  }

  return expandedGroups;
}

export function checkRequiredProperties(props) {
  for (const key in props) {
    if (typeof props[key] === "undefined") {
      console.error(`Required parameter '${key}' was not provided`);
    }
  }
}

export function onImageError(e) {
  e.currentTarget.style.visibility = "hidden";
}
