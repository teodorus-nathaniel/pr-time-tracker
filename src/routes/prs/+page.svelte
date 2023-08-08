<script lang="ts">
  /** internals */
  import Toggle from '$lib/components/Toggle/index.svelte';
  import Input from '$lib/components/Input/index.svelte';

  /** vars */
  let hours = '';
</script>

<Toggle leftButtonProps={{ text: 'Unsubmitted' }} rightButtonProps={{ text: 'Submitted' }} />
<Toggle isReactionToggle />
<Input
  bind:value={hours}
  onInput={(e) => {
    console.log({ value: e.currentTarget.value });
  }} />

{hours}
