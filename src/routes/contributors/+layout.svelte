<script lang="ts">
  /** externals */
  import { page } from '$app/stores';

  /** internals */
  import type { User } from '@octokit/webhooks-types';

  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';

  /** props */
  export let data: { user: User };

  /** vars */
  let isArchiveRoute = false;
  let route = routes.contributors.path;
  let isBaseRoute = true;

  /** react-ibles */
  $: route = $page.url.pathname;
  $: isBaseRoute = route === routes.contributors.path;
  $: isArchiveRoute = route.includes('archive');
</script>

<Header
  user={data.user}
  title={`${!isBaseRoute ? '' : routes.contributors.title}${
    isBaseRoute ? '' : `${data.user.name}${isArchiveRoute ? ' ⏤ Archive' : ''}`
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
