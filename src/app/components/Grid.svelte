<script>
  import i18n from "i18next";
  import textversion from "textversionjs";

  import NewItemLabel from "./NewItemLabel.svelte";
  import ItemOnSaleLabel from "./ItemOnSaleLabel.svelte";
  import ItemAvailabilityIndicator from "./ItemAvailabilityIndicator.svelte";
  import SellPriceLabel from "./SellPriceLabel.svelte";
  import PriceWithoutVATLabel from "./PriceWithoutVATLabel.svelte";
  import AddToBasketButton from "./AddToBasketButton.svelte";
  import ThumbnailImage from "./ThumbnailImage.svelte";

  import { itemLink, checkRequiredProperties, onImageError } from "../utils";
  import { config } from "../store";

  export let items;
  export let group;

  checkRequiredProperties({ items, group });

  function trimmedDescription(item) {
    const description = textversion(item.description);

    return description.length > $config.shortDescriptionLength
      ? description.substr(0, $config.shortDescriptionLength) + "..."
      : description;
  }
</script>

<style>
  .items-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 33.4%;
  }

  .items-grid .cell {
    width: 33.4%;
    box-sizing: border-box;
    position: relative;
  }
</style>

<div class="items-grid">
  {#each items as item (item.code)}
    <div class="cell" itemScope itemType="http://schema.org/Product">
      <link itemProp="url" href={itemLink(item)} />
      <meta itemProp="category" content={group.name} />
      <div class="labels cell-row">
        <NewItemLabel {item} />
        <ItemOnSaleLabel {item} />
      </div>

      <div class="picture cell-row">
        <ThumbnailImage {item} size={120} openImageLink={false} />
      </div>
      <div class="name cell-row">
        <a
          rel="prefetch"
          href={itemLink(item)}
          itemProp="name"
          class:item-hidden={item.hidden}>
          {item.name}
        </a>
        <br />
        <ItemAvailabilityIndicator {item} />
      </div>
      <div class="description cell-row" itemProp="description">
        <meta itemProp="description" content={textversion(item.description)} />
        {trimmedDescription(item)}
      </div>
      <div
        class="price cell-row"
        itemProp="offers"
        itemScope
        itemType="http://schema.org/Offer">
        <link itemProp="availability" href="http://schema.org/InStock" />
        <span class="pull-right">
          <SellPriceLabel {item} />
        </span>
        <span class="pull-left">
          <small>
            <PriceWithoutVATLabel {item} />
          </small>
        </span>
      </div>
      <div class="basket cell-row">
        <div class="pull-left">
          {i18n.t('items.header.code')}
          <br />
          {item.code}
        </div>

        <div class="pull-right">
          <AddToBasketButton {item} />
        </div>
      </div>
    </div>
  {/each}
</div>
