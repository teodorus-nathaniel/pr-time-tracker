import { redirect } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { LayoutServerLoad } from './$types';

import { invalidations, routes } from '$lib/config';
import type { User } from '$lib/server/github';

export const load: LayoutServerLoad = async ({ fetch, depends, url }) => {
  depends(invalidations.user);

  const data: { user: User | null } = await fetch('/api/github/auth/profile').then((res) =>
    res.json()
  );

  if (!data.user && !url.pathname.includes(routes.login.path)) {
    throw redirect(StatusCode.RedirectTemp, routes.login.path);
  } else if (data.user && url.pathname.includes(routes.login.path)) {
    throw redirect(
      StatusCode.RedirectTemp,
      data.user.type === 'User' ? routes.prs.path : routes.contributors.path
    );
  }

  return data;
};
