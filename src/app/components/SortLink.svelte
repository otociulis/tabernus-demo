<script>
  import i18n from "i18next";
  import {
    SORT_DIRECTION_ASC,
    SORT_DIRECTION_DESC,
    sortField,
    sortDirection
  } from "../store";
  import { checkRequiredProperties } from "../utils.js";

  export let field;

  checkRequiredProperties({ field });

  function onClickSort() {
    if ($sortField === field) {
      sortDirection.set(
        $sortDirection === SORT_DIRECTION_DESC
          ? SORT_DIRECTION_ASC
          : SORT_DIRECTION_DESC
      );
    } else {
      sortField.set(field);
    }
  }
</script>

<a href="javascript:void(0)" on:click={onClickSort}>
  {#if $sortField === field}
    <span
      class="glyphicon"
      class:glyphicon-chevron-up={$sortDirection === SORT_DIRECTION_DESC}
      class:glyphicon-chevron-down={$sortDirection === SORT_DIRECTION_ASC} />
  {/if}
  {i18n.t(`items.header.${field}`)}
</a>
