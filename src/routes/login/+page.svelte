<script lang="ts">
  import { goto } from '$app/navigation';

  import Button from '$lib/components/Button/index.svelte';
  import { genAuthUrl } from '$lib/github';

  let isLoading = false;
</script>

<div class="grid place-items-center h-full bg-l1 animate-fadeIn max-w-container">
  <Button
    {isLoading}
    text="Log in with Github"
    icon="github"
    class="gap-2"
    size="large"
    variant="primary"
    onClick={async () => {
      isLoading = true;
      return goto(genAuthUrl());
    }} />
</div>
