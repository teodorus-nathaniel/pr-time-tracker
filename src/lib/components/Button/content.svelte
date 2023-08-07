<script lang="ts">
  /** types */
  import type { ButtonProps } from '../types';

  /** internals */
  import Icon from '$lib/components/Icon/index.svelte';

  /** props */
  export let icon: ButtonProps['icon'] = undefined;
  export let label: ButtonProps['label'] = undefined;
  export let iconSize: number;

  /** props type */
  type $$Props = Pick<ButtonProps, 'icon' | 'label'> & { iconSize: number };
</script>

<template lang="pug">
  if icon
    <Icon name={icon} width={iconSize} height={iconSize} colorInherit isOutlined={$$restProps.isOutlined} />

  if label
    span {label}

  slot</template>
