<script lang="ts">
  import type { ButtonProps } from '../types';

  import Icon from '$lib/components/Icon/index.svelte';

  export let icon: ButtonProps['icon'] = undefined;
  export let label: ButtonProps['label'] = undefined;
  export let iconSize: number;

  type $$Props = Pick<ButtonProps, 'icon' | 'label'> & { iconSize: number };
</script>

{#if icon}
  <Icon
    name={icon}
    width={iconSize}
    height={iconSize}
    colorInherit
    isOutlined={$$restProps.isOutlined} />
{/if}

{#if label}
  <span>{label}</span>
{/if}

<slot />
