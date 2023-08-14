<script lang="ts">
  /** externals */
  import { onMount } from 'svelte';

  /** types */
  import type { PageData } from './$types';

  /** internals */
  import { snackbar } from '$lib/components/Snackbar';
  import PRs from '$lib/layouts/PRs/index.svelte';
  import type { ItemCollection } from '$lib/server/mongo/operations';
  import { activeTab } from '$lib/components/Toggle';
  import { ItemState } from '$lib/constants';

  /** props */
  export let data: PageData;

  /** vars */
  const prs: Record<'pending' | 'approved', ItemCollection[]> = {
    pending: [],
    approved: []
  };
  let isApprovedTab = false;

  /** lifecycles */
  onMount(() => ($snackbar.open = !data.contributor));

  /** react-ibles */
  $: if (!data.contributor && globalThis.history) {
    // globalThis.history.back();
    $snackbar = { text: data.message, type: 'error' };
  }
  $: isApprovedTab = $activeTab.position === 'right';
</script>

<PRs
  context="contributor"
  query={{ state: isApprovedTab ? ItemState.APPROVED : ItemState.PENDING, submitted: true }}
  bind:prs={prs[isApprovedTab ? 'approved' : 'pending']} />
