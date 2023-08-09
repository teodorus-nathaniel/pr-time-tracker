<script lang="ts">
  import { page } from '$app/stores';

  /** internals */
  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';

  /** vars */
  let isArchiveRoute = false;

  /** react-ibles */
  $: isArchiveRoute = $page.url.pathname.includes('/archive');
</script>

<Header
  title={routes[isArchiveRoute ? 'prsArchive' : 'prs'].title}
  breadcrumbs={isArchiveRoute ? `${routes.prs.title} / Archive` : undefined}
  toggle={{
    leftButtonProps: { text: 'Unsubmitted' },
    rightButtonProps: { text: 'Submitted' }
  }} />

<slot />
