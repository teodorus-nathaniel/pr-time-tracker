<script lang="ts">
  import { page } from '$app/stores';

  /** types */
  import type { User } from '@octokit/webhooks-types';
  import type { LayoutData } from './$types';

  /** internals */
  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';
  import { activeTab } from '$lib/components/Toggle';
  import { createEffect } from '$lib/utils';

  /** props */
  export let data: LayoutData;

  /** vars */
  let isArchiveRoute = false;
  let isSubmittedTab = false;
  let user: User;

  /** funcs */
  const useParamsEffect = createEffect();

  /** react-ibles */
  $: isSubmittedTab = Boolean($page.url.searchParams.get('submitted')?.includes('true'));
  $: useParamsEffect(() => {
    $activeTab.position = isSubmittedTab ? 'right' : 'left';
    user = data.user!;
    isArchiveRoute = $page.url.pathname.includes('/archive');
  }, [isSubmittedTab]);
</script>

<Header
  {user}
  title={routes[isArchiveRoute ? 'prsArchive' : 'prs'].title}
  breadcrumbs={isArchiveRoute ? `${routes.prs.title} / Archive` : undefined}
  activeToggleButton={$activeTab.position}
  toggle={{
    leftButtonProps: { text: 'Unsubmitted' },
    rightButtonProps: { text: 'Submitted' }
  }} />

<slot />
