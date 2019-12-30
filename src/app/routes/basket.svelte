<script context="module">
  import { paymentsLoader } from "../loaders";

  export async function preload(page, session) {
    const result = await paymentsLoader(this);
    return result.data;
  }
</script>

<script>
  import i18n from "i18next";
  import numbro from "numbro";
  import * as sapper from "@sapper/app";

  import { basket, selectedPaymentId, config } from "../store";
  import BasketItem from "../components/BasketItem.svelte";
  import BasketSummary from "../components/BasketSummary.svelte";

  export let payments = [];

  let basketValue;
  basket.subscribe(v => (basketValue = v));

  $: selectedPayment =
    payments.find(p => p.id === $selectedPaymentId) || payments[0];

  function onClickContinueShopping() {
    if (typeof history !== "undefined") {
      history.back();
    }
  }

  function onChangeBasketItemCount(index, value) {
    basketValue[index].count = value;
    basket.set(basketValue);
  }

  function onRemoveBasketItem(slug) {
    basket.set(basketValue.filter(x => x.item.slug !== slug));
  }

  function onClickPaymentType(payment) {
    selectedPaymentId.set(payment.id);
  }

  function onClickCheckout() {
    sapper.goto("/checkout");
  }
</script>

<svelte:head>
  <title>{i18n.t('basket.title', $config)}</title>
  <meta name="description" content={i18n.t('basketItems.header')} />
</svelte:head>

<div class="basket-contents">
  <div class="page-header">
    <h1>{i18n.t('basketItems.header')}</h1>
  </div>

  {#if basketValue}
    {#if basketValue.length == 0}
      <div class="no-items-found alert alert-warning" role="alert">
        {i18n.t('basketItems.noItemsFound')}
      </div>
    {/if}

    <div class="row">
      <div class="col-md-9">
        <table class="table table-hover table-striped">
          <tbody>
            {#each basketValue as basketItem, index (basketItem.item.slug)}
              <BasketItem
                {basketItem}
                on:change={e => onChangeBasketItemCount(index, e.detail)}
                on:remove={e => onRemoveBasketItem(basketItem.item.slug)} />
            {/each}
          </tbody>
        </table>
        <button class="btn btn-default" on:click={onClickContinueShopping}>
          <span aria-hidden="true">&larr;</span>
          &nbsp; {i18n.t('basketItems.continueShopping')}
        </button>
      </div>
      <div class="col-md-3">
        {#if basketValue.length > 0}
          <BasketSummary
            text={i18n.t('basketItems.checkout')}
            {selectedPayment}
            on:click={onClickCheckout}>
            <div class="dropdown">
              <a
                href="javascript:void(0)"
                class="dropdown-toggle"
                aria-labelledby="payment-dropdown"
                id="payment-dropdown-menu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true">
                {#if selectedPayment}{selectedPayment.name}{/if}
                <span class="caret" />
              </a>
              <ul class="dropdown-menu" aria-labelledby="payment-dropdown-menu">
                {#each payments as payment (payment.id)}
                  <li>
                    <a
                      href="javascript:void(0)"
                      on:click={() => onClickPaymentType(payment)}>
                      {i18n.t('basketItems.paymentPrice', {
                        name: payment.name,
                        price: numbro(payment.price).formatCurrency()
                      })}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          </BasketSummary>
        {/if}
      </div>
    </div>
  {/if}

</div>
