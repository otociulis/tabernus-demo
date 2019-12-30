<script>
  import i18n from "i18next";

  import { config } from "../store";
  import Navbar from "../components/Navbar.svelte";
  import CatalogBody from "../components/CatalogBody.svelte";
  import ItemDetail from "../components/ItemDetail.svelte";
  import { checkRequiredProperties } from "../utils";

  export let onSaleItems;
  export let newItems;
  export let topLevelGroups;
  export let selectedGroupSlug;
  export let expandedGroups = [];
  export let item;

  checkRequiredProperties({
    onSaleItems,
    newItems,
    topLevelGroups,
    selectedGroupSlug
  });
</script>

<svelte:head>
  {#if item}
    <title>{i18n.t('items.title', { ...$config, name: item.name })}</title>
    <meta name="description" content={item.name} />
  {:else}
    <title>{i18n.t('notFound.title', $config)}</title>
    <meta name="description" content={i18n.t('notFound.header')} />
  {/if}
</svelte:head>

<CatalogBody>
  <div slot="navbar">
    <Navbar
      {onSaleItems}
      {newItems}
      groups={topLevelGroups}
      {expandedGroups}
      {selectedGroupSlug} />
  </div>
  <div slot="content">
    {#if item}
      <ItemDetail {item} />
    {:else}
      <div class="alert">
        <h1>{i18n.t('notFound.header')}</h1>
        <p>{i18n.t('notFound.text')}</p>
      </div>
    {/if}
  </div>
</CatalogBody>
