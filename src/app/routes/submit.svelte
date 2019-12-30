<script context="module">
  import { paymentsLoader } from "../loaders";

  export async function preload(page, session) {
    const result = await paymentsLoader(this);

    return result.data;
  }
</script>

<script>
  import i18n from "i18next";
  import { onMount } from "svelte";
  import * as sapper from "@sapper/app";

  import {
    config,
    basket,
    selectedPaymentId,
    checkout,
    CHECKOUT_TYPE_COMPANY
  } from "../store";
  import { postMutation } from "../loaders";

  export let payments = [];

  let sendingOrderProgress = 1;
  let success = true;
  let createdOrder;

  $: selectedPayment =
    payments.find(p => p.id === $selectedPaymentId) || payments[0];

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onMount(async () => {
    const {
      invoicingAddress,
      order,
      type,
      deliveryAddress,
      deliverToDifferentAddress
    } = $checkout.formData;

    const orderItems = $basket.map(basketItem => {
      const { name, code, price, priceWithVAT, measurement } = basketItem.item;
      return {
        count: basketItem.count,
        name,
        code,
        price,
        priceWithVAT,
        measurement
      };
    });

    let orderData = {
      payment: {
        connect: {
          id: selectedPayment.id
        }
      },
      invoicingAddress: {
        create: invoicingAddress
      },
      items: {
        create: orderItems
      }
    };

    if (type === CHECKOUT_TYPE_COMPANY) {
      orderData = {
        ...order,
        ...orderData
      };
    }

    if (deliverToDifferentAddress) {
      orderData.deliveryAddress = {
        create: deliveryAddress
      };
    }

    await sleep(1000);

    try {
      createdOrder = await postMutation(
        "createOrder",
        "OrderCreateInput",
        "id, number",
        orderData
      );

      sendingOrderProgress = 2;
      await sleep(1000);

      sendingOrderProgress = 3;
      await sleep(1000);

      await postMutation(
        "sendConfirmationEmail",
        "ID!",
        undefined,
        createdOrder.id
      );

      sapper.goto(`/success/${createdOrder.number}`);
    } catch (ex) {
      success = false;
      console.error(ex);
    }

    sendingOrderProgress = 4;
  });
</script>

<svelte:head>
  <title>{i18n.t('checkout.title', $config)}</title>
  <meta name="description" content={i18n.t('checkout.header')} />
</svelte:head>

<div class="checkout-contents">
  <div class="page-header">
    <h1>{i18n.t('checkout.header')}</h1>
  </div>
  <div class="row">
    <div class="col-md-9">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped"
          class:progress-bar-success={sendingOrderProgress === 4 && success}
          class:progress-bar-danger={sendingOrderProgress === 4 && !success}
          class:active={sendingOrderProgress < 4}
          role="progressbar"
          aria-valuenow={sendingOrderProgress}
          aria-valuemin="0"
          aria-valuemax="4"
          style={`width: ${25 * sendingOrderProgress}%`} />
      </div>

      {#if sendingOrderProgress === 4}
        {#if success}
          <div
            class="alert alert-success alert-dismissible fade in"
            role="alert">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close">
              <span aria-hidden="true" />
            </button>
            {i18n.t('checkout.orderPlaced', createdOrder)}
          </div>
        {:else}
          <div
            class="alert alert-danger alert-dismissible fade in"
            role="alert">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close">
              <span aria-hidden="true" />
            </button>
            {i18n.t('checkout.failedToSendOrder')}
          </div>
        {/if}
      {/if}
    </div>
    <div class="col-md-3" />
  </div>

</div>
