<script lang="ts">
  /** types */
  import type { PageData } from './$types';
  import type { User } from '@octokit/webhooks-types';

  /** internals */
  import ArchiveLayout from '$lib/layouts/Archive/index.svelte';

  /** props */
  export let data: PageData;

  /** vars */
  let user: User;

  /** react-ibles */
  $: user = data.user!;
</script>

<ArchiveLayout {user} />
