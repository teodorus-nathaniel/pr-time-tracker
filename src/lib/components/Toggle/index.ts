import { writable } from 'svelte/store';

import type { ToggleProps } from '$lib/components/types';

export const activeTab = writable<ToggleProps['activeButton']>('left');
