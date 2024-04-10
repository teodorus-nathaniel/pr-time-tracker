import { createSvelteRoute } from '@trigger.dev/sveltekit';

import { client } from '$lib/server/trigger-dev';

import '$lib/server/trigger-dev/jobs';

const svelteRoute = createSvelteRoute(client);

//this route is used to send and receive data with Trigger.dev
export const { POST } = svelteRoute;
