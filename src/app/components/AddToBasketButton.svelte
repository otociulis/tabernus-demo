<script>
  import i18n from "i18next";

  import { basket } from "../store";
  import { checkRequiredProperties } from "../utils";

  export let item;
  export let count = 1;

  checkRequiredProperties({ item });

  function onClickBasket() {
    const basketValue = $basket;
    if ($basket) {
      const existingItem = basketValue.find(x => x.item.code === item.code);

      if (!existingItem) {
        basketValue.push({
          item,
          count
        });
      } else {
        existingItem.count += count;
      }

      basket.set(basketValue);
    }
  }
</script>

<button
  type="button"
  class="btn btn-warning btn-s add-to-basket"
  on:click={onClickBasket}>
  <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
  &nbsp; {i18n.t('items.addToBasket')}
</button>
