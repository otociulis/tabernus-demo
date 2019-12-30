<script>
  import numbro from "numbro";

  import { checkRequiredProperties } from "../utils.js";
  import { config } from "../store";

  export let item;

  checkRequiredProperties({ item });

  $: numericPrice = $config.showPriceWithVAT ? item.priceWithVAT : item.price;
</script>

<span>
  <meta itemProp="price" content={numericPrice} />
  <meta
    itemProp="priceCurrency"
    content={numbro.languageData().currency.symbol} />
  {numbro(numericPrice).formatCurrency()}
</span>
