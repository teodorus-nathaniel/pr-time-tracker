<script lang="ts">
  /** externals */
  import { page } from '$app/stores';

  /** types */
  import type { LayoutData } from './$types';
  import type { User } from '@octokit/webhooks-types';

  /** internals */
  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';

  /** props */
  export let data: LayoutData;

  /** vars */
  let isArchiveRoute = false;
  let route = routes.contributors.path;
  let isBaseRoute = true;
  let user: User;

  /** react-ibles */
  $: route = $page.url.pathname;
  $: isBaseRoute = route === routes.contributors.path;
  $: isArchiveRoute = route.includes('archive');
  $: user = data.user!;
</script>

<Header
  {user}
  title={`${!isBaseRoute ? '' : routes.contributors.title}${
    isBaseRoute ? '' : `${user.name}${isArchiveRoute ? ' ⏤ Archive' : ''}`
  }`}
  breadcrumbs={$page.params.username &&
    `Contributors / ${$page.params.username}${isArchiveRoute ? ' / Archive' : ''}`}
  archivePath={`${routes.contributors.path}/${$page.params.username}/archive`}
  toggle={isBaseRoute
    ? undefined
    : {
        leftButtonProps: { text: 'Pending' },
        rightButtonProps: { text: 'Approved' }
      }} />
<slot />
