<script>
  import i18n from "i18next";
  import { checkRequiredProperties } from "../utils.js";

  export let item;

  checkRequiredProperties({ item });
</script>

{#if item.newItem}
  <span class="label label-primary">{i18n.t('items.newItem')}</span>
{/if}
