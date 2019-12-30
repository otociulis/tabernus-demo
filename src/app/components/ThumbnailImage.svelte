<script>
  import { checkRequiredProperties, onImageError, itemLink } from "../utils";

  export let item;
  export let openImageLink = true;
  export let size = 64;

  checkRequiredProperties({ item });
</script>

{#if item.image}
  <a
    href={openImageLink ? item.image.publicUrl : itemLink(item)}
    rel="prefetch">
    <img
      alt={item.name}
      itemProp="image"
      class="img-responsive"
      src={item.image.publicUrl.replace('upload/', `upload/c_scale,w_${size}/`)}
      on:error={onImageError} />
  </a>
{/if}
