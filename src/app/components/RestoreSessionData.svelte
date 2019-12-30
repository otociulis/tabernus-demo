<script>
  import { onMount } from "svelte";
  import {
    viewMode,
    filters,
    sortDirection,
    sortField,
    basket,
    basketDefaultValue,
    LIST_VIEW_MODE,
    SORT_DIRECTION_ASC,
    checkout,
    checkoutDefaultValue,
    CHECKOUT_TYPE_PRIVATE_PARTY
  } from "../store";

  function hookToStorage(options) {
    const { key, store, defaultValue } = options;
    let { serializer, deserializer, storage } = options;
    serializer =
      serializer ||
      function(v) {
        return v;
      };
    deserializer =
      deserializer ||
      function(v) {
        return v;
      };
    storage = storage || sessionStorage;

    if (typeof window !== "undefined") {
      const value = storage.getItem(key) || serializer(defaultValue);

      if (typeof value !== "undefined") {
        store.set(deserializer(value));
      }

      store.subscribe(v => {
        if (typeof v !== "undefined") {
          const newValue = serializer(v);
          storage.setItem(key, newValue);
        } else {
          storage.removeItem(key);
        }
      });
    }
  }

  // Only in browser environement
  onMount(() => {
    hookToStorage({
      key: "viewMode",
      store: viewMode,
      defaultValue: LIST_VIEW_MODE,
      deserializer: v => Number(v)
    });

    hookToStorage({
      key: "filters",
      store: filters,
      defaultValue: 0,
      deserializer: v => Number(v)
    });

    hookToStorage({
      key: "sortDirection",
      store: sortDirection,
      defaultValue: SORT_DIRECTION_ASC,
      deserializer: v => Number(v)
    });

    hookToStorage({
      key: "sortField",
      store: sortField,
      defaultValue: "name"
    });

    hookToStorage({
      key: "basket",
      store: basket,
      storage: localStorage,
      defaultValue: basketDefaultValue,
      serializer: JSON.stringify,
      deserializer: JSON.parse
    });

    hookToStorage({
      key: "checkout",
      store: checkout,
      defaultValue: checkoutDefaultValue,
      serializer: JSON.stringify,
      deserializer: JSON.parse
    });
  });
</script>
