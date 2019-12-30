<script>
  import i18n from "i18next";
  import { LIST_VIEW_MODE, GRID_VIEW_MODE, viewMode } from "../store";

  let viewModeValue;
  viewMode.subscribe(v => (viewModeValue = v));

  const viewModes = [
    {
      text: i18n.t("items.showInList"),
      id: LIST_VIEW_MODE,
      glyph: "glyphicon-th-list"
    },
    {
      text: i18n.t("items.showInGrid"),
      id: GRID_VIEW_MODE,
      glyph: "glyphicon-th"
    }
  ];

  function onClickViewMode(mode) {
    viewMode.set(mode.id);
  }
</script>

<div class="btn-group view-switch pull-right" role="group">
  {#each viewModes as viewMode}
    <button
      type="button"
      title={viewMode.text}
      aria-label={viewMode.text}
      on:click={() => onClickViewMode(viewMode)}
      class:btn-primary={viewModeValue === viewMode.id}
      class="btn btn-default btn-s">
      <span class={`glyphicon ${viewMode.glyph}`} aria-hidden="true" />
    </button>
  {/each}
</div>
