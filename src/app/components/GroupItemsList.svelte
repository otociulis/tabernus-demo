<script>
  import i18n from "i18next";
  import textversion from "textversionjs";

  import SortLink from "./SortLink.svelte";
  import ItemOnSaleLabel from "./ItemOnSaleLabel.svelte";
  import NewItemLabel from "./NewItemLabel.svelte";
  import SellPriceLabel from "./SellPriceLabel.svelte";
  import PriceWithoutVATLabel from "./PriceWithoutVATLabel.svelte";
  import ItemAvailabilityIndicator from "./ItemAvailabilityIndicator.svelte";
  import ItemsViewModeSelector from "./ItemsViewModeSelector.svelte";
  import ItemsViewFilters from "./ItemsViewFilters.svelte";
  import AddToBasketButton from "./AddToBasketButton.svelte";
  import ThumbnailImage from "./ThumbnailImage.svelte";
  import { config } from "../store";
  import { itemLink, checkRequiredProperties } from "../utils";

  export let items;
  export let group;

  checkRequiredProperties({ items, group });
</script>

<div class="items-list">
  <ItemsViewFilters />
  <ItemsViewModeSelector />

  {#if items.length > 0}
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th />
          <th>
            <SortLink field="name" />
          </th>
          <th class="price">
            <SortLink
              field={$config.showPriceWithVAT ? 'priceWithVAT' : 'price'} />
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each items as item (item.code)}
          <tr itemScope itemType="http://schema.org/Product">
            <td class="image">
              <ThumbnailImage {item} openImageLink={false} />
            </td>
            <td>
              <meta itemProp="category" content={group.name} />
              <meta
                itemProp="description"
                content={textversion(item.description)} />
              <div>
                <strong>
                  <a
                    rel="prefetch"
                    class="name"
                    href={itemLink(item)}
                    itemProp="url">
                    <span itemProp="name" class:item-hidden={item.hidden}>
                      {item.name}
                    </span>
                  </a>
                </strong>
                &nbsp;
                <span class="label label-default" itemProp="sku">
                  {item.code}
                </span>
              </div>
              <div class="labels">
                <ItemOnSaleLabel {item} />
                <NewItemLabel {item} />
                <ItemAvailabilityIndicator {item} />
              </div>
            </td>

            <td
              class="price"
              itemProp="offers"
              itemScope
              itemType="http://schema.org/Offer">
              <link itemProp="availability" href="http://schema.org/InStock" />
              <div>
                <SellPriceLabel {item} />
                {#if $config.showPriceWithVAT}
                  <br />
                  <small>
                    <PriceWithoutVATLabel {item} />
                  </small>
                {/if}
              </div>
            </td>

            <td>
              <AddToBasketButton {item} />
              {#if $config.showMeasurement}
                <div class="unit-of-measurement small">
                  {i18n.t('items.header.unitOfMeasurement', item)}
                </div>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
