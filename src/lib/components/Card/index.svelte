<script lang="ts">
  /** externals */

  /** types */
  import type { HTMLAttributes } from 'svelte/elements';

  /** internals */
  import Button from '$lib/components/Button/index.svelte';
  import Toggle from '$lib/components/Toggle/index.svelte';
  import Input from '$lib/components/Input/index.svelte';

  /** props */

  /** props type */
  type $$Props = HTMLAttributes<HTMLLIElement>;
</script>

<li
  {...$$restProps}
  class={`Card ${
    $$restProps.class || ''
  } relative border border-solid border-l4 bg-l1 shadow-input rounded-xl text-t1 transition-all list-none dark:bg-l2 xs:w-full`}>
  <div class="p-4 flex gap-4 justify-between items-center">
    <h2 class="text-t3">holdex / holdex-venture-studio / #115</h2>

    <Button variant="secondary" iconProps={{ name: 'github', width: '1.25rem' }} class="px-0" />
  </div>

  <p class="p-4 border-y border-l4 text-h4-l font-satoshi">
    Problem: It is hard to upload photos into articles
  </p>

  <div class="p-4 text-t3 flex justify-between items-center flex-wrap gap-2 gap-y-4">
    <span class="flex gap-1.5 items-center max-w-content">
      <span>Hour:</span>
      <Input />
    </span>

    <span class="flex gap-1.5 items-center sm:mr-auto sm:ml-3">
      <span>Experience:</span>
      <Toggle isReactionToggle />
    </span>

    <Button size="small" text="Submit" variant="secondary" class="w-full min-w-full sm:min-w-fit" />
  </div>
</li>
