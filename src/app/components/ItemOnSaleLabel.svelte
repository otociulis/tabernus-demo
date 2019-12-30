<script>
  import i18n from "i18next";
  import { checkRequiredProperties } from "../utils.js";

  export let item;

  checkRequiredProperties({ item });
</script>

{#if item.onSale}
  <span class="label label-danger">{i18n.t('items.itemOnSale')}</span>
{/if}
