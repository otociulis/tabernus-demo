<script context="module">
  import { landingPageGroupLoader } from "../loaders";

  export async function preload() {
    const result = await landingPageGroupLoader(this);
    const { onSaleItems, newItems, items, topLevelGroups } = result.data;

    return {
      onSaleItems,
      newItems,
      items,
      topLevelGroups
    };
  }
</script>

<script>
  import i18n from "i18next";
  import Navbar from "../components/Navbar.svelte";
  import CatalogBody from "../components/CatalogBody.svelte";
  import Grid from "../components/Grid.svelte";
  import { recommendedGroupId } from "../utils";
  import { config } from "../store";

  export let onSaleItems, newItems, items, topLevelGroups;

  $: landingPageImage = $config.landingPageImage || {};
</script>

<svelte:head>
  <title>{i18n.t('catalog.title', $config)}</title>
  <meta name="description" content={i18n.t('topbar.catalog')} />
</svelte:head>

<CatalogBody>
  <div slot="navbar">
    <Navbar {onSaleItems} {newItems} groups={topLevelGroups} />
  </div>
  <div slot="content">
    {#if landingPageImage.publicUrl}
      <img src={landingPageImage.publicUrl} alt={$config.landingPageText} />
    {/if}
    {#if $config.landingPageText}
      {@html $config.landingPageText}
    {/if}
    <div className="page-header">
      <h1>{i18n.t('catalogLanding.recommended')}</h1>
    </div>
    <Grid {items} group={{ slug: recommendedGroupId }} />
  </div>
</CatalogBody>
