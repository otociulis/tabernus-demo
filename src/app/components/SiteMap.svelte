<script>
  import { config } from "../store";
  import { groupLink } from "../utils.js";
  import { checkRequiredProperties } from "../utils";
  export let expandedGroups;
  export let group;

  checkRequiredProperties({ group, expandedGroups });

  $: groups = expandedGroups.concat(group);
</script>

{#if $config.showNavigator && groups.length > 0}
  <ol
    itemScope
    itemType="http://www.schema.org/SiteNavigationElement"
    class="breadcrumb">
    {#each groups as group, index (group.slug)}
      <li
        itemProp="itemListElement"
        itemScope
        itemType="http://schema.org/ListItem">
        <a
          rel="prefetch"
          itemScope
          itemType="http://schema.org/Thing"
          itemProp="item"
          href={groupLink(group.slug)}>
          <link itemProp="url" href={groupLink(group.slug)} />
          <span itemProp="name">{group.name}</span>
        </a>
        <meta itemProp="position" content={(index + 1).toString()} />
      </li>
    {/each}
  </ol>
{/if}
