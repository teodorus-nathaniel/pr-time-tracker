import { json, type RequestHandler } from '@sveltejs/kit';

import { client } from '$lib/server/trigger-dev';

import '$lib/server/trigger-dev/jobs';

//this route is used to send and receive data with Trigger.dev
export const POST: RequestHandler = async ({ request }) => {
  const response = await client.handleRequest(request);

  if (!response) {
    return json({ error: 'Not found' }, { status: 404 });
  }

  return json(response.body, { status: response.status });
};
