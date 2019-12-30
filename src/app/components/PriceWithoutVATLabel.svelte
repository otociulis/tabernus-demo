<script>
  import i18n from "i18next";
  import numbro from "numbro";

  import { config } from "../store";
  import { checkRequiredProperties } from "../utils.js";

  export let item;

  checkRequiredProperties({ item });
  $: price = numbro(item.price).formatCurrency();
</script>

{#if $config.showPriceWithVAT}
  <span>
    <meta itemProp="price" content={item.price} />
    <meta
      itemProp="priceCurrency"
      content={numbro.languageData().currency.symbol} />
    {i18n.t('items.priceWithoutVAT', { price })}
  </span>
{/if}
