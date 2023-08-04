<script lang="ts">
  /** types */
  import type { ButtonProps } from '../index';

  /** internals */
  import Content from './content.svelte';

  /** props */
  let className: string | undefined | null = '';
  export { className as class };
  export let label: ButtonProps['label'] = undefined;
  export let size: ButtonProps['size'] = 'medium';
  export let variant: ButtonProps['variant'] = 'primary';
  export let href: ButtonProps['href'] = undefined;
  export let fixedTo: ButtonProps['fixedTo'] = undefined;
  export let icon: ButtonProps['icon'] = undefined;
  // Used for control DOM element from outside
  export let forwardRef: ButtonProps['forwardRef'] = undefined;
  export let disabled: ButtonProps['disabled'] = false;
  export let isSubmitBtn: ButtonProps['isSubmitBtn'] = false;
  export let forwardAction: ButtonProps['forwardAction'] = () => {};
  export let onClick: ButtonProps['onClick'] = undefined;
  export const getRef = () => forwardRef;

  /** funcs */
  const clickHandler = (e?: Event) => {
    if (!disabled && onClick) return onClick(e);
  };

  /** react-ibles */
  $: variantClass = `btn--${variant}`;
  $: sizeClass = `btn--${size}`;
  $: disabledClass = disabled ? 'btn__disabled' : '';
  $: btnType = isSubmitBtn ? 'submit' : 'button';
  $: iconSize = size === 'small' ? 20 : 24;
  $: btnClass = `btn ${variantClass} ${sizeClass} ${className || ''} ${disabledClass}`;

  /** props type */
  type $$Props = ButtonProps;
</script>

{#if href}
  <a
    {...$$restProps}
    use:forwardAction
    {disabled}
    style:width!={fixedTo || 'auto'}
    bind:this={forwardRef}
    class="{btnClass} no-underline"
    {href}>
    <Content {icon} {iconSize} {label}>
      <slot />
    </Content>
  </a>
{:else}
  <button
    {...$$restProps}
    use:forwardAction
    {disabled}
    style:width={fixedTo || 'auto'}
    bind:this={forwardRef}
    class={btnClass}
    type={btnType}
    on:click={clickHandler}>
    <Content {icon} {iconSize} {label}>
      <slot />
    </Content>
  </button>
{/if}

<style lang="sass" src="./style.sass">
  .btn
    @apply relative flex items-center justify-center cursor-pointer border-0 max-w-full bg-transparent

    & > *
        @apply pointer-events-none

    &--large
        @apply py-2 px-4 text-cta rounded-xl

        &.btn--secondary
            @apply py-1.75 px-3.75

    &--medium
        @apply py-1 px-4 text-cta rounded-xl

        &.btn--secondary
            @apply py-0.75 px-3.75

        &.btn--solo
            @apply p-1.75

    &--small
        @apply py-0 px-3 text-cta rounded-xl

        &.btn--solo
            @apply p-1.25

    &.btn__disabled
        @apply cursor-not-allowed

    &--primary
        @apply text-t4 bg-accent1-default transition-all shadow-button

        &:not(.btn__disabled)
            &:hover,
            &:focus
                @apply bg-accent1-active dark:shadow-button-hover

            &.active
                @apply bg-accent1-active shadow-button-active

        &.btn__disabled
            @apply text-t3 bg-l3 shadow-none border border-solid border-l4 dark:bg-l3

    &--secondary
        @apply text-t1 bg-l3 border border-solid border-l3 transition-all shadow-secondary-button

        &:not(.btn__disabled)
            &:hover,
            &:focus
                @apply bg-l4 border-l4 dark:shadow-secondary-button-hover

            &.active
                @apply bg-l3 border-accent1-default dark:shadow-secondary-button-active

        &.btn__disabled
            @apply bg-l3 border-l3 shadow-input

    &.btn--small.btn--secondary
        @apply border-0 before:content-[''] before:absolute before:rounded-2xl before:w-full before:left-0 before:h-full before:top-0 before:border before:border-solid before:border-l3

        &:not(.btn__disabled)
            &:hover,
            &:focus
                @apply bg-l4 before:border-l4 dark:shadow-secondary-button-hover

            &.active
                @apply bg-l3 before:border-accent1-default dark:shadow-secondary-button-active

        &.btn__disabled
            @apply text-t3 bg-l3 before:border-l3 shadow-input

    &--solo
        @apply text-t1 bg-l3 border border-solid border-l3 transition-all shadow-secondary-button

        &:not(.btn__disabled)
            &:hover,
            &:focus
                @apply bg-l4 text-t1 border-l4 dark:shadow-secondary-button-hover

            &.active
                @apply bg-l3 text-t1 border-accent1-default shadow-secondary-button-active

        &.btn__disabled
            @apply text-t3 bg-l3 border-l3 shadow-input

</style>
