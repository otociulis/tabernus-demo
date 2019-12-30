<script context="module">
  import { paymentsLoader } from "../loaders";

  export async function preload(page, session) {
    const result = await paymentsLoader(this);
    return result.data;
  }
</script>

<script>
  import i18n from "i18next";
  import * as sapper from "@sapper/app";

  import { config } from "../store";
  import {
    basket,
    selectedPaymentId,
    checkout,
    CHECKOUT_TYPE_PRIVATE_PARTY,
    CHECKOUT_TYPE_COMPANY
  } from "../store";
  import { postMutation } from "../loaders";

  import { validateAll } from "../forms/FormInputTextField.svelte";
  import BasketSummary from "../components/BasketSummary.svelte";
  import CompanyCheckoutForm from "../forms/CompanyCheckoutForm.svelte";
  import PrivatePartyCheckoutForm from "../forms/PrivatePartyCheckoutForm.svelte";

  export let payments = [];

  $: formData = $checkout && $checkout.formData;
  $: type = $checkout && $checkout.type;

  $: selectedPayment =
    payments.find(p => p.id === $selectedPaymentId) || payments[0];

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function onClickPlaceOrder() {
    if (validateAll()) {
      sapper.goto("/submit");
    }
  }

  function onTypeChanged(type) {
    $checkout.type = type;
    checkout.set($checkout);
  }
</script>

<svelte:head>
  <title>{i18n.t('checkout.title', $config)}</title>
  <meta name="description" content={i18n.t('checkout.header')} />
</svelte:head>

<div class="checkout-contents">
  <div class="page-header">
    <h1>{i18n.t('checkout.header')}</h1>
  </div>
  {#if $basket && $basket.length > 0 && checkout}
    <div class="row">
      <div class="col-md-9">
        <ul class="nav nav-tabs" role="tablist">
          <li
            role="presentation"
            class:active={type === CHECKOUT_TYPE_PRIVATE_PARTY}>
            <a
              href="#private-party"
              aria-controls="home"
              role="tab"
              data-toggle="tab"
              data-checkout-type={CHECKOUT_TYPE_PRIVATE_PARTY}
              on:click={() => onTypeChanged(CHECKOUT_TYPE_PRIVATE_PARTY)}>
              {i18n.t('checkout.privatePurchase')}
            </a>
          </li>
          <li role="presentation" class:active={type === CHECKOUT_TYPE_COMPANY}>
            <a
              href="#company"
              aria-controls="profile"
              role="tab"
              data-toggle="tab"
              on:click={() => onTypeChanged(CHECKOUT_TYPE_COMPANY)}>
              {i18n.t('checkout.companyPurchase')}
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div role="tabpanel">
            {#if type === CHECKOUT_TYPE_PRIVATE_PARTY}
              <PrivatePartyCheckoutForm />
            {/if}
            {#if type === CHECKOUT_TYPE_COMPANY}
              <CompanyCheckoutForm />
            {/if}
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <BasketSummary
          {selectedPayment}
          on:click={onClickPlaceOrder}
          text={i18n.t('checkout.placeOrder')}
          enabled={true} />
      </div>
    </div>
  {/if}
</div>
