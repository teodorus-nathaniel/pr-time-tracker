import { redirect } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { LayoutServerLoad } from './$types';

import { routes } from '$lib/config';

export const load: LayoutServerLoad = async () => {
  throw redirect(StatusCode.RedirectTemp, routes.prs.path);
};
