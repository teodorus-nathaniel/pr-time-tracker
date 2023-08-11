<script lang="ts">
  /** externals */
  import { page } from '$app/stores';

  /** types */
  import type { CardProps } from '$lib/components/types';
  import type { PageData } from './$types';
  import type { User } from '@octokit/webhooks-types';

  /** internals */
  import Card from '$lib/components/Card/index.svelte';
  import { snackbar } from '$lib/components/Snackbar';
  import { ItemType, ItemState, SubmitState } from '$lib/constants/constants';
  import { axios } from '$lib/utils/axios';
  import { createEffect } from '$lib/utils';
  import type { ItemCollection } from '$lib/server/mongo/operations';

  /** props */
  export let data: PageData;

  /** vars */
  const prs: Record<'submitted' | 'unsubmitted', ItemCollection[]> = {
    submitted: [],
    unsubmitted: []
  };
  let isSubmittedPrs = false;
  let isLoading = true;
  let user: User;

  /** funcs */
  const usePREffect = createEffect();

  const getPRs = async (query: {
    owner: string;
    type?: ItemType;
    state?: ItemState;
    submitted?: SubmitState;
  }) => {
    isLoading = true;

    try {
      const { type, owner } = query;
      // Use (or re-add) this when API updated  `/items?type=${type || ItemType.PULL_REQUEST}&state=${state || ItemState.PENDING}&owner=${owner}&submitted=${submitted || SubmitState.UNSUBMITTED}`
      const response = await axios.get<{ result: ItemCollection[] }>(
        `/items?type=${type || ItemType.PULL_REQUEST}&owner=${owner}`
      );

      prs[isSubmittedPrs ? 'submitted' : 'unsubmitted'] = response.data.result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      $snackbar = { text: e.message || e, status: 'failed' };
    } finally {
      isLoading = false;
    }
  };

  const onSubmit: CardProps['onSubmit'] = (props) => () => {
    $snackbar = { open: true, text: 'Please, wait...', status: 'pending' };

    return new Promise((resolve) => {
      setTimeout(() => {
        $snackbar = { text: `Done submitting "${props.hours} hrs" of work.`, status: 'successful' };
        resolve();
      }, 3000);
    });
  };

  /** react-ibles */
  $: user = data.user!;
  $: usePREffect(async () => {
    if (!user.login) return;
    await getPRs({
      owner: user.login,
      submitted: isSubmittedPrs ? SubmitState.SUBMITTED : undefined
    });
  }, [user.email, (isSubmittedPrs = $page.url.hash.includes('submitted'))]);
</script>

<main class="max-w-container m-auto py-4 animate-fadeIn md:py-8">
  <ul class="grid gap-4 md:gap-8">
    {#each prs[isSubmittedPrs ? 'submitted' : 'unsubmitted'] as pr}
      <Card data={pr} {onSubmit} />
    {:else}
      <li class="text-t3">
        {#if isLoading}
          Loading your (Closed) Pull Requests...
        {:else}
          You don't have any closed pull requests.
        {/if}
      </li>
    {/each}
  </ul>
</main>
