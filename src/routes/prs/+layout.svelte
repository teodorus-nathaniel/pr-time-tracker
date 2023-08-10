<script lang="ts">
  import { page } from '$app/stores';

  /** internals */
  import type { User } from '@octokit/webhooks-types';
  import type { ToggleProps } from '$lib/components/types';

  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';

  /** props */
  export let data: { user: User };

  /** vars */
  let isArchiveRoute = false;
  let activeToggleButton: ToggleProps['activeButton'] = 'left';

  /** react-ibles */
  $: isArchiveRoute = $page.url.pathname.includes('/archive');
  $: activeToggleButton = $page.url.hash.includes('submitted') ? 'right' : 'left';
  // $: console.log({ activeToggleButton, hash: $page.url.hash });
</script>

<Header
  user={data.user}
  title={routes[isArchiveRoute ? 'prsArchive' : 'prs'].title}
  breadcrumbs={isArchiveRoute ? `${routes.prs.title} / Archive` : undefined}
  bind:activeToggleButton
  toggle={{
    leftButtonProps: { text: 'Unsubmitted', href: '/' },
    rightButtonProps: { text: 'Submitted', href: '#submitted' }
  }} />

<slot />
