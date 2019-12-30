<script>
  import Group from "./Group.svelte";
  import { groupLink, checkRequiredProperties } from "../utils.js";

  export let groups;
  export let selectedGroupSlug;
  export let expandedGroups;
  export let depth = 1;

  checkRequiredProperties({ groups, expandedGroups });
</script>

<ul class="groups">
  {#each groups as group (group.slug)}
    <Group
      name={group.name}
      slug={group.slug}
      {depth}
      isExpanded={group.slug === selectedGroupSlug || expandedGroups.some(x => x.slug === group.slug)}>
      {#each expandedGroups as expandedGroup}
        {#if expandedGroup.slug === group.slug}
          <svelte:self
            depth={depth + 1}
            {selectedGroupSlug}
            groups={expandedGroup.children}
            {expandedGroups} />
        {/if}
      {/each}
    </Group>
  {/each}
</ul>
