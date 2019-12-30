<script>
  import i18n from "i18next";

  import FormInputTextField from "./FormInputTextField.svelte";
</script>

<div>
  <h3>{i18n.t('checkout.invoicingAddress')}</h3>
  <div class="row">
    <div class="col-md-6">
      <FormInputTextField
        name="invoicingAddress.name"
        messageId="checkout.name"
        required={true} />
      <FormInputTextField
        name="invoicingAddress.surname"
        messageId="checkout.surname"
        required={true} />
      <FormInputTextField
        name="invoicingAddress.phone"
        messageId="checkout.phone"
        required={true} />
      <FormInputTextField
        name="invoicingAddress.email"
        messageId="checkout.email"
        required={true} />
    </div>
    <div class="col-md-6">
      <slot />
      <FormInputTextField
        name="invoicingAddress.street"
        messageId="checkout.street"
        required={true} />
      <FormInputTextField
        name="invoicingAddress.zip"
        messageId="checkout.zip"
        required={true} />
      <FormInputTextField
        name="invoicingAddress.city"
        messageId="checkout.city"
        required={true} />
    </div>
  </div>
</div>
