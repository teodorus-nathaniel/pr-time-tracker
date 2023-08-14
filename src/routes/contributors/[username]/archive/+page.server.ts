import type { PageServerLoad } from './$types';

import type { ContributorCollection } from '$lib/server/mongo/operations';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response: Response = await fetch(`/api/contributors/${params.username}`);
  const data: { result: ContributorCollection; message: string; error?: boolean } =
    await response.json();

  return {
    contributor: data.result,
    message: data.message,
    error: data.error
  };
};
