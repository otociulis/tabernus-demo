<script>
  import {
    LIST_VIEW_MODE,
    GRID_VIEW_MODE,
    viewMode,
    ONLY_NEW_ITEMS_FILTER,
    ONLY_ON_SALE_FILTER,
    ONLY_ON_AVAILABLE_FILTER,
    filters,
    SORT_DIRECTION_ASC,
    SORT_DIRECTION_DESC,
    sortField,
    sortDirection
  } from "../store";
  import { checkRequiredProperties } from "../utils";

  import NoItemsFound from "./NoItemsFound.svelte";
  import GroupsItemsList from "./GroupItemsList.svelte";
  import GroupsItemsGrid from "./GroupItemsGrid.svelte";

  export let items;
  export let group;

  checkRequiredProperties({ items, group });

  const modes = [
    { view: LIST_VIEW_MODE, component: GroupsItemsList },
    { view: GRID_VIEW_MODE, component: GroupsItemsGrid }
  ];

  $: view = modes.find(m => m.view === $viewMode);
  $: onlyNewItems =
    ($filters & ONLY_NEW_ITEMS_FILTER) === ONLY_NEW_ITEMS_FILTER;
  $: onlyOnSale = ($filters & ONLY_ON_SALE_FILTER) === ONLY_ON_SALE_FILTER;
  $: onlyAvailable =
    ($filters & ONLY_ON_AVAILABLE_FILTER) === ONLY_ON_AVAILABLE_FILTER;
  $: collection = items
    .filter(i => {
      return (
        (onlyNewItems ? i.newItem : true) &
        (onlyOnSale ? i.onSale : true) &
        (onlyAvailable ? i.count > 0 : true)
      );
    })
    .sort((a, b) => {
      const dataA = a[$sortField];
      const dataB = b[$sortField];

      switch ($sortField) {
        case "price":
        case "priceWithVAT":
          return $sortDirection === SORT_DIRECTION_ASC
            ? dataA - dataB
            : dataB - dataA;
        case "name":
          return $sortDirection === SORT_DIRECTION_ASC
            ? dataA.localeCompare(dataB)
            : dataB.localeCompare(dataA);
        default:
          return 0;
      }
    });
</script>

<div class="page-header">
  <h1>{group.name}</h1>
  {#if group.description}
    <h2>
      {@html group.description}
    </h2>
  {/if}

  <slot />
</div>

{#if view && $sortField}
  <svelte:component this={view.component} items={collection} {group} />
{/if}

<NoItemsFound items={collection} />
