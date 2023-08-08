<script lang="ts">
  import { page } from '$app/stores';

  /** internals */
  import Button from '$lib/components/Button/index.svelte';
  import Toggle from '$lib/components/Toggle/index.svelte';

  /** vars */
  let displayAvatarFallback = false;
  let isArchiveRoute = false;

  /** react-ibles */
  $: isArchiveRoute = $page.url.pathname.includes('/archive');
</script>

<header class="animate-fadeIn">
  <div class="pb-4 flex justify-between border-b border-l3 md:pb-8">
    <div class="flex gap-3 items-center">
      <span class="grid place-items-center w-8 h-8 bg-l3 rounded-full overflow-clip text-t3">
        {#if !displayAvatarFallback}
          <img
            src="https://avatars.githubusercontent.com/u/28790485?v=4"
            alt="Avatar"
            width="32"
            height="32"
            on:error={() => (displayAvatarFallback = true)}
            class="object-cover object-center" />
        {:else}
          S
        {/if}
      </span>

      <span class="text-t3">Sunday Power Inemesit</span>
    </div>

    <Button variant="icon" iconProps={{ name: 'arrow-right-on-rectangle' }} aria-label="Log out" />
  </div>

  {#if isArchiveRoute}
    <span class="text-t3 block my-4 md:my-8">Your Closed Pull Requests / Archive</span>
  {/if}

  <h1 class="text-h3-l my-4 font-satoshi md:my-8">
    Your Closed Pull Requests {isArchiveRoute ? 'Archive' : ''}
  </h1>

  {#if !isArchiveRoute}
    <div class="flex py-3 justify-between">
      <Toggle leftButtonProps={{ text: 'Unsubmitted' }} rightButtonProps={{ text: 'Submitted' }} />

      <Button variant="secondary" text="Archive" href="/prs/archive" />
    </div>
  {/if}
</header>

<slot />
