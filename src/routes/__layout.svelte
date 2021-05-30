<svelte:head>
  <script defer src="/analytics.js"></script>
  <link rel="shortcut icon" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/favicon.png" />
</svelte:head>

<slot />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
