import type { PageServerLoad } from './$types';

import { invalidations } from '$lib/config';
import type { ItemSchema } from '$lib/server/mongo/operations';
import { ItemType } from '$lib/constants';

export const load: PageServerLoad = async ({ fetch, depends, parent }) => {
  depends(invalidations.user);

  const parentData = await parent();
  const response: Response = await fetch(
    `/api/items?type=${ItemType.PULL_REQUEST}&contributor=${parentData.user?.login}`
  );
  const result: {
    data: ItemSchema[] | null;
    message: string;
    error?: boolean;
  } = await response.json();

  return {
    prs: result.data,
    message: result.error ? result.message : '',
    error: result.error
  };
};
