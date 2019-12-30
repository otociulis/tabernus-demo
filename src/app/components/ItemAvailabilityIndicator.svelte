<script>
  import i18n from "i18next";
  import { checkRequiredProperties } from "../utils.js";
  export let item;
  checkRequiredProperties({ item });
  $: available = item.count > 0;
</script>

<span
  class="label"
  class:item-available={available}
  class:item-not-available={!available}>
  {i18n.t(`items.${available ? 'itemsAvailable' : 'itemsNotAvailable'}`, item)}
</span>
