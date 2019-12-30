<script>
  import i18n from "i18next";

  import FormInputTextField from "./FormInputTextField.svelte";
  import { checkout } from "../store";

  let checkoutValue;

  checkout.subscribe(v => (checkoutValue = v));
  $: formData = checkoutValue.formData;

  $: deliverToDifferentAddress = formData.deliverToDifferentAddress === true;

  function onChangeUseDifferentAddress() {
    checkoutValue.formData.deliverToDifferentAddress = !deliverToDifferentAddress;
    checkout.set(checkoutValue);
  }
</script>

<div>
  <h3>{i18n.t('checkout.deliveryAddress')}</h3>

  <div class="checkbox">
    <label>
      <input
        type="checkbox"
        name="delivery-use-different-address"
        on:change={onChangeUseDifferentAddress}
        checked={deliverToDifferentAddress} />
      {i18n.t('checkout.deliverToDifferentAddress')}
    </label>
  </div>
  {#if deliverToDifferentAddress}
    <div className="row">
      <div className="col-md-6">
        <FormInputTextField
          name="deliveryAddress.name"
          messageId="checkout.name"
          required={true} />
        <FormInputTextField
          name="deliveryAddress.surname"
          messageId="checkout.surname"
          required={true} />
        <FormInputTextField
          name="deliveryAddress.phone"
          messageId="checkout.phone"
          required={true} />
        <FormInputTextField
          name="deliveryAddress.email"
          messageId="checkout.email"
          required={true} />
      </div>
      <div className="col-md-6">
        <FormInputTextField
          name="deliveryAddress.street"
          messageId="checkout.street"
          required={true} />
        <FormInputTextField
          name="deliveryAddress.zip"
          messageId="checkout.zip"
          required={true} />
        <FormInputTextField
          name="deliveryAddress.city"
          messageId="checkout.city"
          required={true} />
      </div>
    </div>
  {/if}
</div>
