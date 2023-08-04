<script lang="ts">
  /** Add all icons used throught out the app in this file. Follow the example with the 'exclamation-triangle' below. */
  /** externals */
  import { ExclamationTriangle } from '@steeze-ui/heroicons';

  /** types */
  import type { IconName, IconProps } from '..';

  /** siblings */
  import IconSource from './source.svelte';

  /** props */
  export let name: IconName;

  /** type */
  type $$Props = IconProps;
</script>

{#if name === 'exclamation-triangle'}
  <IconSource {...$$restProps} src={ExclamationTriangle} />
{:else}
  <span />
{/if}
