<script>
  import i18n from "i18next";
  import numbro from "numbro";
  import textversion from "textversionjs";
  import * as sapper from "@sapper/app";

  import { config } from "../store";
  import NewItemLabel from "./NewItemLabel.svelte";
  import ItemOnSaleLabel from "./ItemOnSaleLabel.svelte";
  import ItemAvailabilityIndicator from "./ItemAvailabilityIndicator.svelte";
  import SellPriceLabel from "./SellPriceLabel.svelte";
  import AddToBasketButton from "./AddToBasketButton.svelte";
  import ThumbnailImage from "./ThumbnailImage.svelte";

  import { checkRequiredProperties, groupLink } from "../utils.js";

  export let item;
  checkRequiredProperties({ item });
  let count = 1;

  function onErrorImage(e) {
    e.currentTarget.style.visibility = "hidden";
  }

  function onClickChangeCount(delta) {
    count += delta;
  }

  function onClickBackToGroup() {
    sapper.goto(groupLink(item.group.slug));
  }
</script>

<div class="item-detail" itemScope itemType="http://schema.org/Product">
  <div class="page-header">
    <button class="btn btn-default" on:click={onClickBackToGroup}>
      <span aria-hidden="true">&larr;</span>
      &nbsp; {i18n.t('itemDetail.backToGroup')}
    </button>
    <h1 itemProp="name" class:item-hidden={item.hidden}>{item.name}</h1>
  </div>

  <div class="row">
    <div class="col-md-6">
      <NewItemLabel {item} />
      <ItemOnSaleLabel {item} />
      <ThumbnailImage {item} size={400} />
    </div>
    <div class="col-md-6 meta-data">
      <div class="row">
        <div class="col-md-5">{i18n.t('itemDetail.code')}</div>
        <div class="col-md-7" itemProp="sku">{item.code}</div>
      </div>

      <div class="row">
        <div class="col-md-5">{i18n.t('itemDetail.availability')}</div>
        <div class="col-md-7">
          <ItemAvailabilityIndicator {item} />
        </div>
      </div>

      <div>
        {#if $config.showPriceWithVAT}
          <div class="row">
            <div class="col-md-5">{i18n.t('itemDetail.priceWithoutVAT')}</div>
            <div class="col-md-7">
              {i18n.t('itemDetail.pricePerMeasurementUnit', {
                price: numbro(item.price).formatCurrency(),
                measurement: item.measurement
              })}
            </div>
          </div>
        {/if}
      </div>

      <div class="row">
        <div class="col-md-5">
          <div class="price-header">{i18n.t('itemDetail.pricePerUnit')}</div>
        </div>
        <div
          class="col-md-7"
          itemProp="offers"
          itemScope
          itemType="http://schema.org/Offer">
          <link itemProp="availability" href="http://schema.org/InStock" />
          <div class="price-per-peasurement-unit">
            <SellPriceLabel {item} />
            {i18n.t('itemDetail.pricePerMeasurementUnit', {
              measurement: item.measurement
            })}
          </div>
        </div>
      </div>

      <div class="row basket">
        <div class="col-md-5">
          <div class="input-group">
            <div class="input-group-btn">
              <button
                class="btn btn-default"
                type="button"
                on:click={() => onClickChangeCount(-1)}>
                <span class="glyphicon glyphicon-minus" />
              </button>
            </div>
            <input
              min={0}
              max={9999}
              type="number"
              bind:value={count}
              step={1}
              aria-label="Count"
              class="form-control"
              defaultValue="1" />
            <div class="input-group-btn">
              <button
                class="btn btn-default"
                type="button"
                on:click={() => onClickChangeCount(1)}>
                <span class="glyphicon glyphicon-plus" />
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <AddToBasketButton {item} {count} />
        </div>
      </div>
    </div>
  </div>
  <ul class="nav nav-tabs" role="tablist">
    <li class="active" aria-controls="description" role="tab" data-toggle="tab">
      <a href="javascript:void(0)">{i18n.t('itemDetail.description')}</a>
    </li>
  </ul>

  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="description">
      <meta itemProp="description" content={textversion(item.description)} />
      {@html item.description}
    </div>
  </div>
</div>
