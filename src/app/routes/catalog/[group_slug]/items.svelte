<script context="module">
  import { groupPeersLoader, groupLoader } from "../../../loaders";
  import { expandedGroups } from "../../../utils";

  export async function preload(page, session) {
    const { group_slug } = page.params;
    const result = await groupLoader(this, group_slug);

    const {
      onSaleItems,
      newItems,
      groups,
      items,
      childGroups,
      topLevelGroups,
      groupHierarchy
    } = result.data;

    return {
      selectedGroupSlug: group_slug,
      onSaleItems,
      newItems,
      group: groups.length === 0 ? undefined : groups[0],
      items,
      childGroups,
      topLevelGroups,
      expandedGroups: await expandedGroups(this, groupHierarchy)
    };
  }
</script>

<script>
  import i18n from "i18next";

  import { config } from "../../../store";
  import Navbar from "../../../components/Navbar.svelte";
  import CatalogBody from "../../../components/CatalogBody.svelte";
  import GroupItems from "../../../components/GroupItems.svelte";
  import ChildGroups from "../../../components/ChildGroups.svelte";
  import SiteMap from "../../../components/SiteMap.svelte";

  export let onSaleItems,
    newItems,
    group,
    items,
    childGroups,
    selectedGroupSlug,
    expandedGroups,
    topLevelGroups;
</script>

<svelte:head>
  {#if group}
    <title>{i18n.t('catalog.title', $config)}</title>
    <meta name="description" content={i18n.t('topbar.catalog')} />
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
    {#if group}
      <SiteMap {group} {expandedGroups} />
      <GroupItems {group} {items}>
        <ChildGroups {childGroups} />
      </GroupItems>
    {:else}
      <div class="alert">
        <h1>{i18n.t('notFound.header')}</h1>
        <p>{i18n.t('notFound.text')}</p>
      </div>
    {/if}
  </div>
</CatalogBody>
