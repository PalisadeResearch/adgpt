<script>
  import { onMount } from 'svelte';

  export let brand;
  export let path;

  let scale = 100; // Default scale (100%)
  let translate = 0;
  let shouldMask = false;

  if (brand === 'charmin') {
    scale = 100; // 125% zoom for Charmin
	translate = 0;
    shouldMask = true;
  } else if (brand === 'demo') {
    scale = 75; // 60% zoom (40% smaller) for GOP and demo
    shouldMask = true;
  } else if (brand === 'gop') {
    scale = 70;
	translate = 0;
    shouldMask = true;
  } else if (brand === 'nike') {
	shouldMask = true;
  }

  let processedImageUrl = '';

  onMount(async () => {
    if (shouldMask) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = path;
      await new Promise(resolve => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // If pixel is white or very close to white, make it transparent
        if (data[i] > 250 && data[i + 1] > 250 && data[i + 2] > 250) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      processedImageUrl = canvas.toDataURL();
    }
  });
</script>

<div class="wrapper relative w-[50px] h-[55px] rounded-[15px] overflow-hidden flex-1">
  <div class="absolute inset-0 bg-gray-200"></div>
  <img
    src={shouldMask && processedImageUrl ? processedImageUrl : path}
    alt={`${brand} logo`}
    class="absolute inset-0 w-full h-full"
    style="transform: scale({scale}%) translate({translate}px); transform-origin: center;"
  />
</div>

<style>
  img {
    transition: transform 0.3s ease;
  }

  @screen big {
      .wrapper {
		@apply w-[80px] h-[100px];
	  }
  }
  @screen superbig {
      .wrapper {
		@apply w-[80px] h-[120px];
	  }
  }
</style>