<script context="module">
  import { onSaleGroupLoader } from "../../../loaders";

  export async function preload(page, session) {
    const result = await onSaleGroupLoader(this);
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
  import { onSaleGroupId } from "../../../utils";

  export let topLevelGroups, onSaleItems, newItems, items;
</script>

<VirtualGroupPage
  virtualGroupSlug={onSaleGroupId}
  {topLevelGroups}
  {onSaleItems}
  {newItems}
  {items} />
