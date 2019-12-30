<script context="module">
  export async function preload(page, session) {
    const { order_number } = page.params;

    return {
      order: {
        number: order_number
      }
    };
  }
</script>

<script>
  import i18n from "i18next";
  import {
    basket,
    basketDefaultValue,
    checkout,
    checkoutDefaultValue
  } from "../../store";
  import * as sapper from "@sapper/app";

  export let order;

  import { onMount } from "svelte";

  basket.set(basketDefaultValue);
  checkout.set(checkoutDefaultValue);

  function onClickContinueShopping() {
    sapper.goto("/");
  }
</script>

<div class="checkout-contents">
  <div class="page-header">
    <h1>{i18n.t('checkout.header')}</h1>
  </div>
  <div class="row">
    <div class="col-md-9">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-success"
          role="progressbar"
          style="width: 100%" />
      </div>

      <div class="alert alert-success alert-dismissible fade in" role="alert">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close">
          <span aria-hidden="true" />
        </button>
        {i18n.t('checkout.orderPlaced', order)}
      </div>
    </div>
    <div class="col-md-3" />
  </div>

  <button class="btn btn-default" on:click={onClickContinueShopping}>
    <span aria-hidden="true">&larr;</span>
    &nbsp; {i18n.t('basketItems.continueShopping')}
  </button>

</div>
