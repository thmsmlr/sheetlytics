<script>
  let x = 1;
</script>

<svelte:head>
  <title>Sheetlytics</title>
</svelte:head>

<div class="max-w-screen-md mx-auto md:px-6 px-4">
  <div class="mt-4 text-gray-900">
    <img class="w-[12rem] md:-ml-16 md:w-[22rem] md:h-[173px]" src="/logo.svg" alt="" />

    <h1 class="mt-2 text-4xl md:text-4xl font-normal leading-tight md:leading-10">
      Are you <strong class="font-extrabold">cheap</strong>?<br />
      Complain about <strong class="font-extrabold">privacy</strong> on Twitter? <br />
      Hate Google, but love that <strong class="font-extrabold">free</strong> compute?
    </h1>
    <h3 class="mt-2 text-xl font-medium text-gray-700">
      Same same. So we're doing something about it.
    </h3>

    <div class="mt-6 prose">
      <p><strong>Google Analytics</strong> has been powering the web for years.</p>
      <p>
        It's a great service, but developers have woken up. We don't want to contribute to Google
        tracking our users across the web. We don't want to deal with GDPR compliance. We just want
        to know how much traffic we're getting.
      </p>

      <p>The mission is simple:</p>
      <ul>
        <li>Free hosting</li>
        <li>Basic, lightweight analytics</li>
        <li>No tracking cookies, GDPR compliant</li>
      </ul>
    </div>
  </div>
</div>

<div class="mt-16 bg-yellow-50">
  <div class="max-w-screen-md mx-auto md:px-6 px-4 py-12 text-center bg-yellow-50">
    <h2 class="inline text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl">
      Ready for something new?
    </h2>
    <p class="inline text-3xl font-extrabold tracking-tight text-yellow-600 sm:block sm:text-4xl">
      Sign up to get notified when we launch.
    </p>
    <form class="mt-8 sm:flex justify-center" action="/api/get-notified">
      <label for="emailAddress" class="sr-only">Email address</label>
      <input
        id="emailAddress"
        name="email"
        type="email"
        autocomplete="email"
        required
        class="w-full px-5 py-3 placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs border-gray-300 rounded-md"
        placeholder="Enter your email"
      />
      <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Notify me
        </button>
      </div>
    </form>
  </div>
</div>
<p class="py-12 text-gray-800 text-center">
  Created by:
  <a class="text-yellow-600 hover:text-yellow-700 font-semibold" href="https://twitter.com/thmsmlr"
    >@thmsmlr</a
  >
</p>
