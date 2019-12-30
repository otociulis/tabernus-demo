<script>
  import i18n from "i18next";

  import SortLink from "./SortLink.svelte";
  import ItemOnSaleLabel from "./ItemOnSaleLabel.svelte";
  import NewItemLabel from "./NewItemLabel.svelte";
  import SellPriceLabel from "./SellPriceLabel.svelte";
  import ItemAvailabilityIndicator from "./ItemAvailabilityIndicator.svelte";
  import ItemsViewModeSelector from "./ItemsViewModeSelector.svelte";
  import ItemsViewFilters from "./ItemsViewFilters.svelte";
  import Grid from "./Grid.svelte";
  import { config } from "../store";
  import { checkRequiredProperties } from "../utils";
  import {
    SORT_DIRECTION_ASC,
    SORT_DIRECTION_DESC,
    sortField,
    sortDirection
  } from "../store";

  export let items;
  export let group;

  checkRequiredProperties({ items, group });

  const sortOptions = [
    {
      text: i18n.t("items.sortNameAscending"),
      field: "name",
      direction: SORT_DIRECTION_ASC
    },
    {
      text: i18n.t("items.sortNameDescending"),
      field: "name",
      direction: SORT_DIRECTION_DESC
    },
    {
      text: i18n.t("items.sortPriceAscending"),
      field: $config.showPriceWithVAT ? "priceWithVAT" : "price",
      direction: SORT_DIRECTION_ASC
    },
    {
      text: i18n.t("items.sortPriceDescending"),
      field: $config.showPriceWithVAT ? "priceWithVAT" : "price",
      direction: SORT_DIRECTION_DESC
    }
  ];

  function onClickSort(option) {
    sortField.set(option.field);
    sortDirection.set(option.direction);
  }
</script>

<div>
  <ItemsViewFilters />
  <ItemsViewModeSelector />

  {#if items.length > 0}
    <div class="items-grid-sort">
      <ul class="nav nav-tabs" style="clear: both">
        {#each sortOptions as option}
          <li
            role="presentation"
            class:active={$sortField === option.field && $sortDirection === option.direction}>
            <a
              rel="prefetch"
              href="javascript:void(0)"
              aria-controls="profile"
              on:click={() => onClickSort(option)}>
              {option.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="items-grid">
    <Grid {items} {group} />
  </div>
</div>
