<script>
  import { Subject, of } from 'rxjs';
  import { switchMap, delay, pluck, startWith } from 'rxjs/operators';
  import { createTurboForm } from '$lib/turboform';

  let turboform = createTurboForm();
  let chatform = createTurboForm();

  let delayedSubmitting = new Subject().pipe(
    pluck('submitting'),
    switchMap((x) => (x ? of(x).pipe(delay(500)) : of(false))),
    startWith(false)
  );

  $: delayedSubmitting.next($chatform);
</script>

<p>This is a test page to demonstrate svelte-turbo-forms</p>

<br />
<br />
<br />
<br />
<p>
  This text is outside of the form to show that state is maintained when the form is submitted just
  like you'd expect in a SPA application. However, it's just using the turbo form.
</p>
<input type="text" />
<br />
<br />
<br />
<br />

{#if $turboform.submitted}
  <p>Thank you for signing up</p>
{:else}
  <form use:turboform action="/api/test-form" method="POST">
    {#if $turboform.error}
      <p>Errors: {$turboform.error}</p>
    {/if}
    <label for="firstName">First Name</label>
    <input id="firstName" name="firstName" type="text" />
    <label for="lastName">Last Name</label>
    <input id="lastName" name="lastName" type="text" />
    {#if $turboform?.errorFields?.lastName}
      <p class="mt-2 text-sm text-red-600" id="email-error">{$turboform.errorFields.lastName}</p>
    {/if}
    <button>Submit</button>
  </form>
{/if}
<pre>
  {JSON.stringify($turboform, null ,4)}
</pre>

<form use:chatform on:submit={() => chatform.element.reset()} action="/api/test-form" method="POST">
  <label for="lastName">Last Name</label>
  <input id="lastName" name="lastName" type="text" autocomplete="off" />
  <button>Submit</button>
  {#if $delayedSubmitting}
    <p>Submitting...</p>
  {/if}
</form>
<pre>
  {JSON.stringify($chatform, null ,4)}
</pre>
<pre>
  {JSON.stringify($delayedSubmitting, null ,4)}
</pre>
