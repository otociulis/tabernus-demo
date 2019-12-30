<script>
  import { onMount } from "svelte";
  import { config } from "../store";
  import { stores } from "@sapper/app";

  $: id = $config.googleAnalyticsId;

  onMount(() => {
    if (id) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", id);

      const { page } = stores();

      // Hook up page state changes
      page.subscribe(p => {
        gtag("config", id, { page_path: p.path });
      });
    }
  });
</script>

<svelte:head>
  {#if id}
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}>

    </script>
  {/if}
</svelte:head>
