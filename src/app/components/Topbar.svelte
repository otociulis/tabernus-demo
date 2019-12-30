<script>
  import i18n from "i18next";
  import { onMount } from "svelte";
  import * as sapper from "@sapper/app";

  import Basket from "./Basket.svelte";
  import { searchLoader } from "../loaders";
  import { groupLink, itemLink } from "../utils";
  import { searchKeyword, config } from "../store";

  const searchPlaceholder = i18n.t("topbar.searchPlaceholder");
  let keyword = "";
  let foundItems = [];

  searchKeyword.subscribe(v => {
    keyword = v;
    onKeyUpSearch();
  });

  async function onKeyUpSearch(e) {
    if (e && e.keyCode === 13) {
      onClickSearch();
    } else {
      let found = [];

      if (keyword.length > 0) {
        const res = await searchLoader(undefined, keyword);

        const { groups, items } = res.data;
        found = groups.map(g => {
          return {
            ...g,
            link: groupLink(g.slug)
          };
        });

        found = found.concat(
          items.slice(0, 10 - found.length).map(i => {
            return {
              ...i,
              link: itemLink(i),
              name: i.name
            };
          })
        );
      }

      foundItems = found;
    }
  }

  onMount(async () => {
    await onKeyUpSearch();
  });

  function onClickSearch() {
    if (keyword.length > 0) {
      sapper.goto(`/search/${encodeURI(keyword)}`);
    }
  }
</script>

<nav class="navbar navbar-fixed-top navbar-inverse">
  <div class="navbar-header">
    <button
      type="button"
      class="navbar-toggle collapsed"
      data-toggle="collapse"
      data-target="#top-navbar-collapse"
      aria-expanded="false">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar" />
      <span class="icon-bar" />
      <span class="icon-bar" />
    </button>

    <div class="navbar-brand">
      <a href="/" rel="prefetch">
        <div class="logo">

          <img alt="logo" src="/circuit.png" />

          <span>{$config.firmName}</span>
        </div>
      </a>
    </div>

  </div>

  <div class="nav navbar-nav navbar-right">
    <Basket />
  </div>

  <div class="navbar-form navbar-right" role="search">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-btn">
          <input
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            type="text"
            bind:value={keyword}
            class="search form-control"
            placeholder={searchPlaceholder}
            on:keyup={onKeyUpSearch} />

          <ul class="dropdown-menu" class:hide={foundItems.length === 0}>
            {#each foundItems as foundItem (foundItem.slug)}
              <li>
                <a rel="prefetch" href={foundItem.link}>{foundItem.name}</a>
              </li>
            {/each}
          </ul>

        </div>
      </div>
    </div>

    <button
      type="button"
      class="btn btn-default"
      on:click={onClickSearch}
      disabled={keyword.length === 0}>
      <span class="glyphicon glyphicon-search" aria-hidden="true" />
    </button>
  </div>

  <div class="collapse navbar-collapse" id="top-navbar-collapse">
    <ul class="nav navbar-nav navbar-right">
      <li>
        <a rel="prefetch" href="/about">{i18n.t('topbar.about')}</a>
      </li>
      <li>
        <a rel="prefetch" href="/">{i18n.t('topbar.catalog')}</a>
      </li>
      <li>
        <a rel="prefetch" href="/termsAndConditions">
          {i18n.t('topbar.termsAndConditions')}
        </a>
      </li>
    </ul>
  </div>
</nav>
