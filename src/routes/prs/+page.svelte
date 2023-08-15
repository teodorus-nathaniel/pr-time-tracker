<script lang="ts">
  /** types */
  import type { PageData } from './$types';

  /** internals */
  import PRs from '$lib/layouts/PRs/index.svelte';
  import type { ItemCollection } from '$lib/server/mongo/operations';
  import { activeTab } from '$lib/components/Toggle';

  /** props */
  export let data: PageData;

  /** vars */
  const prs: Record<'submitted' | 'unsubmitted', ItemCollection[]> = {
    submitted: [],
    unsubmitted: []
  };
  let isSubmittedPrs = false;

  /** react-ibles */
  $: isSubmittedPrs = $activeTab.position === 'right';
</script>

<PRs
  bind:prs={prs[isSubmittedPrs ? 'submitted' : 'unsubmitted']}
  query={{
    submitted: isSubmittedPrs ? true : undefined
  }} />
