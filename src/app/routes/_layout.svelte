<script context="module">
  import localization from "../../../localization";
  import { config } from "../store";
  import "../../less/tabernus.less";

  export async function preload(page, session) {
    await localization(session.config.language);
    config.set(session.config);
  }
</script>

<script>
  import Topbar from "../components/Topbar.svelte";
  import RestoreSessionData from "../components/RestoreSessionData.svelte";
  import LinkingData from "../components/LinkingData.svelte";
  import GoogleAnalytics from "../components/GoogleAnalytics.svelte";

  import { websiteAddress } from "../headers";
</script>

<svelte:head>
  <meta name="keywords" content={$config.keywords} />
  <meta property="og:title" content={websiteAddress} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={websiteAddress} />
</svelte:head>

<LinkingData />
<GoogleAnalytics />
<RestoreSessionData />
<Topbar />

<div class="content">
  <slot />
</div>
