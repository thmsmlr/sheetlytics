<svelte:head>
  <script defer src="/analytics.js"></script>
</svelte:head>

<slot />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
