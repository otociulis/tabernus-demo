<script>
  import i18n from "i18next";
  import {
    onSaleGroupId,
    newItemsGroupId,
    checkRequiredProperties
  } from "../utils";

  import Group from "./Group.svelte";
  import Groups from "./Groups.svelte";

  export let onSaleItems;
  export let newItems;
  export let groups;
  export let selectedGroupSlug = undefined;
  export let expandedGroups = [];

  checkRequiredProperties({
    onSaleItems,
    newItems,
    groups
  });
</script>

<nav
  class="affix hidden-sm"
  data-spy="content"
  data-offset-top="160"
  data-offset-bottom="200">
  <div class="panel panel-primary">
    <div class="panel-heading">
      <a href="/" rel="prefetch">{i18n.t('navbar.catalog')}</a>
    </div>

    <div class="panel-body">
      <ul class="groups">
        {#if onSaleItems.count > 0}
          <Group
            depth={1}
            name={i18n.t('catalogLanding.itemsOnSale')}
            slug={onSaleGroupId}
            isExpanded={selectedGroupSlug === onSaleGroupId} />
        {/if}
        {#if newItems.count > 0}
          <Group
            depth={1}
            name={i18n.t('catalogLanding.newItems')}
            slug={newItemsGroupId}
            isExpanded={selectedGroupSlug === newItemsGroupId} />
        {/if}
        <hr />
        <Groups {groups} {selectedGroupSlug} {expandedGroups} depth={1} />
      </ul>
    </div>
  </div>
</nav>
