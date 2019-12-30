<script>
  import i18n from "i18next";
  import { checkRequiredProperties } from "../utils";

  export let items;

  checkRequiredProperties({ items });
</script>

{#if items.length === 0}
  <div class="no-items-found alert alert-warning" role="alert">
    {i18n.t('searchResults.noItemsFound')}
  </div>
{/if}
