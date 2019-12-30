<script>
  import i18n from "i18next";
  import { config } from "../store";
</script>

<svelte:head>
  <title>{i18n.t('termsAndConditions.title', $config)}</title>
  <meta name="description" content={i18n.t('topbar.termsAndConditions')} />
</svelte:head>

<h1>
  <i18n.FormattedMessage id="termsAndConditions.header" />
</h1>

{@html $config.termsAndConditions}
