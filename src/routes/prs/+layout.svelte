<script lang="ts">
  import { page } from '$app/stores';

  /** types */
  import type { User } from '@octokit/webhooks-types';
  import type { LayoutData } from './$types';

  /** internals */
  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';
  import { activeTab } from '$lib/components/Toggle';

  /** siblings */

  /** props */
  export let data: LayoutData;

  /** vars */
  let isArchiveRoute = false;
  let user: User;

  /** react-ibles */
  $: {
    $activeTab = $page.url.searchParams.get('submitted')?.includes('true') ? 'right' : 'left';
    user = data.user!;
    isArchiveRoute = $page.url.pathname.includes('/archive');
  }
</script>

<Header
  {user}
  title={routes[isArchiveRoute ? 'prsArchive' : 'prs'].title}
  breadcrumbs={isArchiveRoute ? `${routes.prs.title} / Archive` : undefined}
  activeToggleButton={$activeTab}
  toggle={{
    leftButtonProps: { text: 'Unsubmitted', href: '?submitted=false' },
    rightButtonProps: { text: 'Submitted', href: '?submitted=true' }
  }} />

<slot />
