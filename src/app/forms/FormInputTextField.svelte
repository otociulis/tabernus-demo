<script context="module">
  const validationFunctions = new Map();

  export function validateAll() {
    let allValid = true;
    validationFunctions.forEach(callback => {
      allValid = callback() ? allValid : false;
    });

    return allValid;
  }
</script>

<script>
  import i18n from "i18next";
  import validator from "validator";
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  import { checkRequiredProperties } from "../utils.js";
  import { checkout } from "../store";

  export let name;
  export let messageId;
  export let type = "text";
  export let required = false;

  checkRequiredProperties({ name, messageId });

  let value;
  let checkoutValue;

  checkout.subscribe(v => {
    checkoutValue = v;
    const parts = name.split(".");

    if (v.formData[parts[0]]) {
      value = v.formData[parts[0]][parts[1]];
    }

    value = value || "";
  });

  $: formData = checkoutValue.formData;
  $: label = i18n.t(messageId);

  let error;

  onMount(() => {
    validationFunctions.set(name, validate);
  });

  onDestroy(() => {
    validationFunctions.delete(name);
  });

  export function validate() {
    const parts = name.split(".");

    if (required) {
      if (validator.isEmpty(value || "")) {
        error = i18n.t("validation.isEmpty");
      } else {
        error = undefined;
      }
    }

    const isValid = error === undefined;

    if (isValid) {
      if (typeof formData[parts[0]] === "undefined") {
        formData[parts[0]] = {};
      }
      formData[parts[0]][parts[1]] = value;
    } else {
      if (formData[parts[0]]) {
        delete formData[parts[0]][parts[1]];
      }
    }

    checkoutValue.formData = formData;
    checkout.set(checkoutValue);

    return isValid;
  }

  function onChange(e) {
    const { srcElement } = e;
    value = srcElement.value;

    validate();
  }
</script>

<div class="form-group" class:has-feedback={error} class:has-error={error}>
  <label class="control-label">{label}</label>
  <input
    {type}
    {name}
    {value}
    on:change={onChange}
    on:blur={onChange}
    class="form-control" />
  {#if error}
    <span class="glyphicon glyphicon-warning-sign form-control-feedback" />
    <span id="helpBlock" class="help-block">{error}</span>
  {/if}
</div>
