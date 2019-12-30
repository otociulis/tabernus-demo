<script context="module">
  import { itemLoader } from "../../../../loaders";
  import { expandedGroups } from "../../../../utils";

  export async function preload(page, session) {
    const { item_slug, group_slug } = page.params;
    const result = await itemLoader(this, item_slug, group_slug);
    const {
      groupHierarchy,
      topLevelGroups,
      onSaleItems,
      newItems,
      items
    } = result.data;

    return {
      topLevelGroups,
      onSaleItems,
      newItems,
      item: items.length === 0 ? undefined : items[0],
      selectedGroupSlug: group_slug,
      expandedGroups: await expandedGroups(this, groupHierarchy)
    };
  }
</script>

<script>
  import ItemDetailPage from "../../../../pages/ItemDetailPage.svelte";
  export let item;
  export let selectedGroupSlug;
  export let expandedGroups;
  export let onSaleItems;
  export let newItems;
  export let topLevelGroups;
</script>

<ItemDetailPage
  {onSaleItems}
  {item}
  {newItems}
  {topLevelGroups}
  {selectedGroupSlug}
  {expandedGroups} />
