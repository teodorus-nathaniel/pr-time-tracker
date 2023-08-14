import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { invalidations, routes } from '$lib/config';
import type { User } from '$lib/server/github';
import { REDIRECT_TEMP } from '$lib/constants';

export const load: LayoutServerLoad = async ({ fetch, depends, url }) => {
  depends(invalidations.user);

  const data: { user: User | null } = await fetch('/api/github/auth/profile').then((res) =>
    res.json()
  );

  if (!data.user && !url.pathname.includes(routes.login.path)) {
    throw redirect(REDIRECT_TEMP, routes.login.path);
  } else if (data.user && url.pathname.includes(routes.login.path)) {
    throw redirect(
      REDIRECT_TEMP,
      data.user.type === 'User' ? routes.prs.path : routes.contributors.path
    );
  }

  return data;
};
