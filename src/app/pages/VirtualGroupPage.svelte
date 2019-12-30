<script>
  import i18n from "i18next";
  import { config } from "../store";
  import Navbar from "../components/Navbar.svelte";
  import CatalogBody from "../components/CatalogBody.svelte";
  import GroupItems from "../components/GroupItems.svelte";

  export let topLevelGroups, onSaleItems, newItems, items, virtualGroupSlug;
  $: groupName = i18n.t(`virtualGroup.${virtualGroupSlug}`);
  $: group = { name: groupName, slug: virtualGroupSlug };
</script>

<svelte:head>
  <title>{i18n.t('items.title', { ...$config, name: groupName })}</title>
  <meta name="description" content={groupName} />
</svelte:head>

<CatalogBody>
  <div slot="navbar">
    <Navbar
      groups={topLevelGroups}
      {onSaleItems}
      {newItems}
      selectedGroupSlug={virtualGroupSlug} />
  </div>
  <div slot="content">
    <GroupItems {group} {items} />
  </div>
</CatalogBody>
