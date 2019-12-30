<script context="module">
  import { searchItemsLoader } from "../../loaders";
  import { expandedGroups } from "../../utils";

  export async function preload(page, session) {
    let { keyword } = page.params;
    keyword = decodeURI(keyword);
    const result = await searchItemsLoader(this, keyword);
    const { items } = result.data;

    return { items, keyword };
  }
</script>

<script>
  import i18n from "i18next";

  import {
    config,
    searchKeyword,
    LIST_VIEW_MODE,
    GRID_VIEW_MODE,
    viewMode
  } from "../../store";

  import GroupItems from "../../components/GroupItems.svelte";

  export let keyword,
    items = [];
  const group = {
    name: i18n.t("searchResults.header", { keyword }),
    slug: "search_results"
  };

  searchKeyword.set("");
</script>

<svelte:head>
  <title>{i18n.t('searchResults.title', $config)}</title>
  <meta name="description" content={i18n.t('searchResults.header')} />
</svelte:head>

<div>
  <GroupItems {group} {items} />
</div>
