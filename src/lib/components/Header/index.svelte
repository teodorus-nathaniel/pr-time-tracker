<script lang="ts">
  /** externals */
  import { page } from '$app/stores';

  /** types */
  import type { ToggleProps } from '../types';

  /** internals */
  import Button from '$lib/components/Button/index.svelte';
  import Toggle from '$lib/components/Toggle/index.svelte';
  import PageTitle from '$lib/components/PageTitle/index.svelte';
  import { routes } from '$lib/config';

  /** props */
  export let title = 'Home';
  export let username = 'Sunday Power Inemesit';
  export let avatar = 'https://avatars.githubusercontent.com/u/28790485?v=4';
  export let archivePath: string | undefined = routes.prsArchive.path;
  export let breadcrumbs: string | undefined = '';
  export let toggle: ToggleProps | undefined = undefined;

  /** vars */
  let displayAvatarFallback = false;
  let isArchiveRoute = false;

  /** react-ibles */
  $: isArchiveRoute = $page.url.pathname.includes('archive');
</script>

<header class="animate-fadeIn">
  <div class="pb-4 flex justify-between border-b border-l3 md:pb-8">
    <div class="flex gap-3 items-center">
      <span class="grid place-items-center w-8 h-8 bg-l3 rounded-full overflow-clip text-t3">
        {#if !displayAvatarFallback}
          <img
            src={avatar}
            alt="Avatar"
            width="32"
            height="32"
            on:error={() => (displayAvatarFallback = true)}
            class="object-cover object-center" />
        {:else}
          {username[0]}
        {/if}
      </span>

      <span class="text-t3">{username}</span>
    </div>

    <Button
      variant="icon"
      iconProps={{ name: 'arrow-right-on-rectangle' }}
      aria-label="Log out"
      href={routes.login.path} />
  </div>

  {#if breadcrumbs}
    <span class="text-t3 block my-4 md:my-8">
      {breadcrumbs}
    </span>
  {/if}

  <PageTitle {title} />

  <slot />

  {#if !isArchiveRoute && toggle}
    <div class="flex py-3 justify-between">
      <Toggle leftButtonProps={toggle.leftButtonProps} rightButtonProps={toggle.rightButtonProps} />

      <Button variant="secondary" text="Archive" href={archivePath} />
    </div>
  {/if}
</header>
