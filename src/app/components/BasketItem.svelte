<script context="module">
  import { configLoader } from "../loaders";

  export async function preload() {
    const result = await configLoader(this, "showPriceWithVAT");
    return result.data[0];
  }
</script>

<script>
  import i18n from "i18next";
  import numbro from "numbro";
  import { createEventDispatcher } from "svelte";

  import ThumbnailImage from "../components/ThumbnailImage.svelte";
  import { itemLink, checkRequiredProperties } from "../utils";
  import { config } from "../store";

  const dispatch = createEventDispatcher();

  export let basketItem;

  checkRequiredProperties({ basketItem });
  $: item = basketItem.item;
  $: count = basketItem.count;
  $: sum = ($config.showPriceWithVAT ? item.priceWithVAT : item.price) * count;

  function onClickRemoveItem() {
    dispatch("remove");
  }
  function onChangeCount(e) {
    const { srcElement } = e;
    dispatch("change", Number(srcElement.value));
  }
</script>

<tr>
  <td>
    <button
      type="button"
      class="btn btn-danger btn-xs"
      on:click={onClickRemoveItem}>
      <span class="glyphicon glyphicon-remove" aria-hidden="true" />
    </button>
  </td>
  <td class="image">
    <ThumbnailImage {item} openImageLink={false} />
  </td>
  <td>
    <strong>
      <a rel="preload" href={itemLink(item)}>{item.name}</a>
    </strong>
    &nbsp;
    <span class="label label-default">{item.code}</span>
  </td>
  <td class="price">
    <div>
      {i18n.t('basketItems.pricePerItem', {
        price: numbro(item.price).formatCurrency(),
        measurement: item.measurement
      })}
      {#if $config.showPriceWithVAT}
        <br />
        <small>
          {i18n.t('items.priceWithoutVAT', {
            price: numbro(item.price).formatCurrency()
          })}
        </small>
      {/if}
    </div>
  </td>
  <td>
    {#if count > 9}
      <input
        min={0}
        max={9999}
        type="number"
        step={1}
        value={count}
        class="form-control"
        on:change={onChangeCount} />
    {:else}
      <select value={count} class="form-control" on:change={onChangeCount}>
        {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as number}
          <option value={number}>{number}</option>
        {/each}
        <option value={10}>10+</option>
      </select>
    {/if}
  </td>
  <td class="total-price price">{numbro(sum).formatCurrency()}</td>
</tr>
