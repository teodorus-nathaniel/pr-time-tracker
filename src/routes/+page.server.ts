import { redirect } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  throw redirect(StatusCode.RedirectTemp, '/prs');
};
