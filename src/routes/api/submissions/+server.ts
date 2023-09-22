import { json } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';
import type { SubmissionSchema } from '$lib/@types';

import { SUCCESS_OK } from '$lib/constants';
import { jsonError, transform } from '$lib/utils';
import { items, submissions } from '$lib/server/mongo/collections';
import { verifyAuth } from '$lib/server/github';

export const GET: RequestHandler = async ({ url: { searchParams }, cookies }) => {
  try {
    await verifyAuth(cookies);

    const id = transform<string>(searchParams.get('id'));
    const data = await (id ? submissions.getOne(id) : submissions.getMany());

    return json({ message: 'success', data }, { status: SUCCESS_OK });
  } catch (e) {
    return jsonError(e, '/api/submissions');
  }
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    await verifyAuth(cookies);

    return json({
      data: await submissions.create(transform<SubmissionSchema>(await request.json())!)
    });
  } catch (e) {
    return jsonError(e, '/api/submissions', 'POST');
  }
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
  try {
    await verifyAuth(cookies);

    const submission = await submissions.update(
      transform<SubmissionSchema>(await request.json(), {
        pick: ['_id', 'hours', 'experience', 'approval']
      })!
    );

    await items.update({ id: submission.item_id, updated_at: submission.updated_at! });

    // To-do: Add Authorization (through out endpoints) to restrict/prevent updating unauthorized (submission) paths
    return json({
      data: submission
    });
  } catch (e) {
    return jsonError(e, '/api/submissions', 'PATCH');
  }
};
