<script>
  import InvoicingAddress from "./InvoicingAddress.svelte";
  import DeliveryAddress from "./DeliveryAddress.svelte";

  import FormInputTextField from "./FormInputTextField.svelte";
</script>

<form>
  <InvoicingAddress>
    <FormInputTextField
      name="order.companyName"
      messageId="checkout.company"
      required={true} />
    <FormInputTextField
      name="order.companyIdentificationNumber"
      messageId="checkout.companyIdentificationNumber"
      required={true} />
    <FormInputTextField
      name="order.taxpayerIdentificationNumber"
      messageId="checkout.taxpayerIdentificationNumber" />
    <FormInputTextField
      name="order.VATIdentificationNumber"
      messageId="checkout.VATIdentificationNumber" />

  </InvoicingAddress>
  <DeliveryAddress />
</form>
