import { json } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { RequestHandler } from '@sveltejs/kit';

import { responseHeadersInit } from '$lib/config';
import { contributors } from '$lib/server/mongo/collections';
import { verifyAuth } from '$lib/server/github';

export const GET: RequestHandler = async ({ cookies, url }) => {
  try {
    await verifyAuth(url, 'GET', cookies);

    return json(
      { message: 'success', result: await contributors.getMany() },
      { status: StatusCode.SuccessOK, headers: responseHeadersInit }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return json(
      { message: e.message || e, result: null, error: true },
      { status: StatusCode.ServerErrorInternal }
    );
  }
};
