<script>
  import i18n from "i18next";
  import { config } from "../store";
</script>

<svelte:head>
  <title>{i18n.t('about.title', $config)}</title>
  <meta name="description" content={i18n.t('topbar.about')} />
</svelte:head>

{@html $config.aboutPageHeader}

<h2>{i18n.t('about.phone.contactInfo')}</h2>

<address>
  <strong>{$config.name}</strong>
  <br />
  <div>{$config.street}</div>
  <div>{$config.zipCode} {$config.town}</div>
  <br />

  <div>
    <abbr title={i18n.t('about.phone.title')}>
      <span class="glyphicon glyphicon-phone" />
    </abbr>
    &nbsp;: {i18n.t('about.phoneNumberFormat', $config)}
  </div>

  <div>
    <abbr title={i18n.t('about.phone.title')}>
      <span class="glyphicon glyphicon-envelope" />
    </abbr>
    &nbsp;:
    <a href={'mailto:' + $config.email}>{$config.email}</a>
  </div>
</address>

<strong>
  <i18n.FormattedMessage id="about.invoicing" />
</strong>
<br />

<div>
  <abbr title={i18n.t('about.companyIdentificationNumber.title')}>
    {i18n.t('about.companyIdentificationNumber.abbreviation')}
  </abbr>
  &nbsp;: {$config.ICO}
</div>

<div>
  <abbr title={i18n.t('about.taxpayerIdentificationNumber.title')}>
    {i18n.t('about.taxpayerIdentificationNumber.abbreviation')}
  </abbr>
  &nbsp;: {$config.ICDPH}
</div>

<div>
  <abbr title={i18n.t('about.VATIdentificationNumber.title')}>
    {i18n.t('about.VATIdentificationNumber.abbreviation')}
  </abbr>
  &nbsp;: {$config.ICDPHPrefix} {$config.ICDPH}
</div>

<br />

<div>
  {@html $config.aboutPageFooter}  
</div>
