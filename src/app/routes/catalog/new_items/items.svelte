<script context="module">
  import { newItemsGroupLoader } from "../../../loaders";

  export async function preload(page, session) {
    const result = await newItemsGroupLoader(this);
    const { topLevelGroups, onSaleItems, newItems, items } = result.data;

    return {
      topLevelGroups,
      onSaleItems,
      newItems,
      items
    };
  }
</script>

<script>
  import VirtualGroupPage from "../../../pages/VirtualGroupPage.svelte";
  import { newItemsGroupId } from "../../../utils";

  export let topLevelGroups, onSaleItems, newItems, items;
</script>

<VirtualGroupPage
  virtualGroupSlug={newItemsGroupId}
  {topLevelGroups}
  {onSaleItems}
  {newItems}
  {items} />
