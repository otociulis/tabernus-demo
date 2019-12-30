<script>
  import i18n from "i18next";
  import {
    ONLY_NEW_ITEMS_FILTER,
    ONLY_ON_SALE_FILTER,
    ONLY_ON_AVAILABLE_FILTER,
    filters
  } from "../store";

  const filtersMap = [
    {
      text: i18n.t("filters.onlyNewItems"),
      id: ONLY_NEW_ITEMS_FILTER
    },
    {
      text: i18n.t("filters.onlyOnSale"),
      id: ONLY_ON_SALE_FILTER
    },
    {
      text: i18n.t("filters.onlyAvailable"),
      id: ONLY_ON_AVAILABLE_FILTER
    }
  ];

  function onClickFilter(filter) {
    let value = $filters;
    if ((value & filter.id) === filter.id) {
      value &= ~filter.id;
    } else {
      value |= filter.id;
    }
    filters.set(value);
  }
</script>

<ul class="nav nav-pills pull-left">
  <li class="dropdown active">
    <a
      href="javascript:void(0)"
      class="dropdown-toggle"
      id="filters-button"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false">
      {i18n.t('filters.list')}
      <span class="caret" />
    </a>
    <ul class="dropdown-menu" aria-labelledby="filters-button">
      {#each filtersMap as filter}
        <li>
          <a href="javascript:void(0)" on:click={() => onClickFilter(filter)}>
            {filter.text}
          </a>
        </li>
      {/each}
    </ul>
  </li>
  {#each filtersMap as filter}
    {#if ($filters & filter.id) === filter.id}
      <li>
        <a href="javascript:void(0)" on:click={() => onClickFilter(filter)}>
          <span class="glyphicon glyphicon-remove" />
          &nbsp; {filter.text}
        </a>
      </li>
    {/if}
  {/each}
</ul>
