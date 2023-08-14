import { writable } from 'svelte/store';

import type { SnackbarType } from '../types';

export const snackbar = writable<{ open?: boolean; text?: string; type?: SnackbarType }>({
  open: true,
  text: 'Just a second...',
  type: 'busy'
});
