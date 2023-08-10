<script lang="ts">
  import { page } from '$app/stores';

  /** internals */
  import type { User } from '@octokit/webhooks-types';

  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';

  /** props */
  export let data: { user: User };

  /** vars */
  let isArchiveRoute = false;

  /** react-ibles */
  $: isArchiveRoute = $page.url.pathname.includes('/archive');
</script>

<Header
  user={data.user}
  title={routes[isArchiveRoute ? 'prsArchive' : 'prs'].title}
  breadcrumbs={isArchiveRoute ? `${routes.prs.title} / Archive` : undefined}
  toggle={{
    leftButtonProps: { text: 'Unsubmitted' },
    rightButtonProps: { text: 'Submitted' }
  }} />

<slot />
