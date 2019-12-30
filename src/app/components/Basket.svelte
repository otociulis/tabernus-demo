<script>
  import i18n from "i18next";
  import * as sapper from "@sapper/app";

  import { basket } from "../store";

  $: basketItemCount = $basket ? $basket.reduce((a, v) => a + v.count, 0) : 0;

  function onClickButton(e) {
    sapper.goto("/basket");
  }
</script>

<button
  type="button"
  class="btn btn-warning navbar-btn basket-button"
  on:click={onClickButton}>
  <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
  &nbsp; {i18n.t('topbar.basket')} &nbsp;
  <span class="badge">{basketItemCount}</span>
</button>
