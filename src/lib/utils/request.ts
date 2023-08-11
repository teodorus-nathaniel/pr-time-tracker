import ax from 'axios';

import { snackbar } from '$lib/components/Snackbar';
import { ItemState, ItemType } from '$lib/constants/constants';
import type { ItemCollection } from '$lib/server/mongo/operations';

export const axios = ax.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use((config) => {
  // Add caching to requests
  config.headers['Cache-Control'] = 'max-age=300'; // duration is in seconds

  return config;
});

export const getPRs = async (query: {
  owner: string;
  type?: ItemType;
  state?: ItemState;
  submitted?: boolean;
  archived?: boolean;
}) => {
  try {
    const { owner, type, submitted, state, archived } = query;
    const response = await axios.get<{ result: ItemCollection[] }>(
      `/items?type=${type || ItemType.PULL_REQUEST}&owner=${owner}&submitted=${submitted}&state=${
        state || ItemState.PENDING
      }&archived=${archived}`
    );

    return response.data.result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    snackbar.set({ text: e.message || e, type: 'error' });
    return [];
  }
};
