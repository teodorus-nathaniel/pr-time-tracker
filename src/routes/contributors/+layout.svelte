<script lang="ts">
  import { page } from '$app/stores';

  /** internals */
  import Header from '$lib/components/Header/index.svelte';
  import { routes } from '$lib/config';

  /** props */
  export let _data: { contributor: { username: string; name: string } } = {
    contributor: {
      username: 'power-f-GOD',
      name: 'Sunday Power Inemesit'
    }
  };

  /** vars */
  let isArchiveRoute = false;
  let route = routes.contributors.path;
  let isBaseRoute = true;

  /** react-ibles */
  $: route = $page.url.pathname;
  $: isBaseRoute = route === routes.contributors.path;
  $: isArchiveRoute = route.includes('/archive');
</script>

<Header
  avatar="https://avatars.githubusercontent.com/u/1125014?v=4"
  username="Vadim"
  title={`${!isBaseRoute ? '' : routes.contributors.title}${
    isBaseRoute ? '' : `${_data.contributor.name}${isArchiveRoute ? ' ⏤ Archive' : ''}`
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
