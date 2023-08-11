<script lang="ts">
  /** externals */
  import type { PageData } from './$types';
  import type { User } from '@octokit/webhooks-types';

  /** internals */
  import Contributor from '$lib/components/Card/Contributor.svelte';
  import { createEffect } from '$lib/utils';

  /** contributorops */
  export let data: PageData;

  /** vars */
  let contributors: User[] = [];
  let isLoading = true;
  let user: User;

  /** funcs */
  const useContributorEffect = createEffect();

  const getContributors = async () => {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => resolve([user]), 1000);
    });
  };

  /** react-ibles */
  $: user = data.user!;
  $: useContributorEffect(async () => {
    isLoading = true;
    contributors = await getContributors();
    isLoading = false;
  }, [user.login]);
</script>

<main class="max-w-container m-auto py-4 animate-fadeIn md:py-8">
  <ul class="grid gap-4 md:gap-8">
    {#each contributors as { avatar_url, login, name }}
      <Contributor {avatar_url} {name} username={login} />
      <Contributor {avatar_url} {name} username={login} />
    {:else}
      <li class="text-t3">
        {#if isLoading}
          Loading contributors...
        {:else}
          There are no contributors.
        {/if}
      </li>
    {/each}
  </ul>
</main>
