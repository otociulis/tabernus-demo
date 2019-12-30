<script>
  import i18n from "i18next";
  import numbro from "numbro";
  import { createEventDispatcher } from "svelte";

  import { basket, config } from "../store";

  export let text;
  export let selectedPayment;
  export let enabled = true;

  const dispatch = createEventDispatcher();

  let sum = 0;
  let sumWoVAT = 0;
  $: shipping = selectedPayment ? selectedPayment.price : 0;
  basket.subscribe(basketItems => {
    if (basketItems) {
      [sum, sumWoVAT] = basketItems.reduce(
        (a, basketItem) => {
          const { item, count } = basketItem;
          const price =
            ($config.showPriceWithVAT ? item.priceWithVAT : item.price) * count;
          const priceWoVAT = item.price * count;
          return [a[0] + price, a[1] + priceWoVAT];
        },
        [0, 0]
      );
    }
  });

  function onClickButton() {
    dispatch("click");
  }
</script>

<div class="panel panel-primary">
  <div class="panel-heading">{i18n.t('basketItems.summary')}</div>
  <div class="panel-body">
    <div class="row">
      <div class="col-md-6">{i18n.t('basketItems.subtotal')}</div>
      <div class="col-md-6">
        <div>{numbro(sum).formatCurrency()}</div>
        <small>
          {i18n.t('items.priceWithoutVAT', {
            price: numbro(sumWoVAT).formatCurrency()
          })}
        </small>
      </div>
    </div>
    <slot />
    <div class="row">
      <div class="col-md-6">{i18n.t('basketItems.payment')}</div>
      <div class="col-md-6">{numbro(shipping).formatCurrency()}</div>
    </div>
    <div class="row">
      <div class="col-md-6 total">{i18n.t('basketItems.total')}</div>
      <div class="col-md-6 total">
        {numbro(sum + shipping).formatCurrency()}
      </div>
    </div>
    <div class="row">
      <button
        class="btn btn-warning center-block"
        on:click={onClickButton}
        disabled={!enabled}>
        {text}
      </button>
    </div>

  </div>
</div>
