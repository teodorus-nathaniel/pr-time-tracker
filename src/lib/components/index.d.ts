import { HTMLButtonAttributes, type HTMLAnchorAttributes } from 'svelte/elements';

/** Button */
export interface ButtonProps extends HTMLButtonAttributes, HTMLAnchorAttributes {
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'solo';
  label?: string;
  href?: string;
  fixedTo?: string;
  icon?: IconName | undefined;
  /** Used for control DOM element from outside */
  forwardRef?: HTMLButtonElement | HTMLAnchorElement;
  disabled?: boolean;
  isSubmitBtn?: boolean;
  forwardAction?: any;
  onClick?: (e?: Event) => void;
  getRef?: () => ButtonProps['forwardRef'];
}

/** Icon */
export interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  isOutlined?: boolean;
  colorInherit?: boolean;
}

export interface IconSouceProps extends Omit<IconProps, 'name'> {
  src: { solid?: IconThemeSource } & { default: IconThemeSource };
}

type AllowedTags = 'path' | 'circle' | 'rect' | 'polygon' | 'polyline' | 'line';
type IconThemeSource = {
  a: { [attribute: string]: string };
} & {
  [tag in AllowedTags]?: Array<{ [attribute: string]: string }>;
};

/** Add names of icons you use (or include) here (for stricter typing and intellisense). */
export type IconName = 'exclamation-triangle';
