<script lang="ts">
  /** externals */
  import { page } from '$app/stores';

  /** types */
  import type { LayoutData } from './$types';
  import type { User } from '@octokit/webhooks-types';

  /** internals */
  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';
  import type { ContributorCollection } from '$lib/server/mongo/operations';
  import { activeTab } from '$lib/components/Toggle';

  /** props */
  export let data: LayoutData;

  /** vars */
  let isArchiveRoute = false;
  let route = routes.contributors.path;
  let isBaseRoute = true;
  let user: User;
  let contributor: ContributorCollection | undefined;

  /** react-ibles */
  $: route = $page.url.pathname;
  $: isBaseRoute = route === routes.contributors.path;
  $: isArchiveRoute = route.includes('archive');
  $: user = data.user!;
</script>

<Header
  {user}
  title={`${!isBaseRoute ? '' : routes.contributors.title}${
    isBaseRoute
      ? ''
      : `${contributor?.name || $page.params.username}${isArchiveRoute ? ' ⏤ Archive' : ''}`
  }`}
  breadcrumbs={$page.params.username &&
    `Contributors / ${$page.params.username}${isArchiveRoute ? ' / Archive' : ''}`}
  archivePath={`${routes.contributors.path}/${$page.params.username}/archive`}
  activeToggleButton={$activeTab.position}
  toggle={isBaseRoute
    ? undefined
    : {
        leftButtonProps: { text: 'Pending' },
        rightButtonProps: { text: 'Approved' }
      }} />
<slot />
