<script>
  import { groupLink, checkRequiredProperties } from "../utils.js";
  export let depth;
  export let name;
  export let slug;
  export let isExpanded = false;

  checkRequiredProperties({ depth, name, slug });
</script>

<li class="group">
  <a
    rel="prefetch"
    data-level={depth}
    href={groupLink(slug)}
    class:is-expanded={isExpanded}>
    {name}
  </a>
  <slot />
</li>
