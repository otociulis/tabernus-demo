<script>
  import { config } from "../store";
  import { groupLink } from "../utils.js";
  import { checkRequiredProperties } from "../utils";

  export let childGroups;
  checkRequiredProperties({ childGroups });
</script>

<style>
  .sub-groups {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 33%;
  }
  .sub-groups div {
    width: 33%;
    box-sizing: border-box;
  }
  .sub-groups div a {
    font-weight: 700;
    padding: 10px;
    display: block;
  }
</style>

{#if $config.showSubGroups}
  <div class="sub-groups">
    {#each childGroups as childGroup}
      <div>

        <a rel="prefetch" href={groupLink(childGroup.slug)}>
          > &nbsp; {childGroup.name} &nbsp;
          <!-- <span className="item-count">({childGroup.itemCount})</span> -->
        </a>
      </div>
    {/each}
  </div>
{/if}
