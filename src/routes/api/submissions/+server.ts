import { json } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';

import { SUCCESS_OK } from '$lib/constants';
import { jsonError, transform } from '$lib/utils';
import { items, submissions } from '$lib/server/mongo/collections';
import { verifyAuth } from '$lib/server/github';

import { UserRole, type SubmissionSchema } from '$lib/@types';

export const GET: RequestHandler = async ({ url: { searchParams, pathname }, cookies }) => {
  try {
    await verifyAuth(pathname, 'GET', cookies);

    const id = transform<string>(searchParams.get('id'));
    const data = await (id ? submissions.getOne(id) : submissions.getMany());

    return json({ message: 'success', data }, { status: SUCCESS_OK });
  } catch (e) {
    return jsonError(e, '/api/submissions');
  }
};

export const POST: RequestHandler = async ({ url, request, cookies }) => {
  try {
    await verifyAuth(url, 'POST', cookies);

    return json({
      data: await submissions.create(transform<SubmissionSchema>(await request.json())!)
    });
  } catch (e) {
    return jsonError(e, '/api/submissions', 'POST');
  }
};

export const PATCH: RequestHandler = async ({ request, cookies, url }) => {
  try {
    let body: SubmissionSchema;

    await verifyAuth(url, 'PATCH', cookies, async (role) => {
      body = transform<SubmissionSchema>(await request.json(), {
        pick: ['_id' as keyof SubmissionSchema].concat(
          role === UserRole.MANAGER ? ['approval'] : ['hours', 'experience']
        )
      })!;

      return true;
    });

    const submission = await submissions.update(body!);

    await items.update({ id: submission.item_id, updated_at: submission.updated_at! });

    return json({
      data: submission
    });
  } catch (e) {
    return jsonError(e, '/api/submissions', 'PATCH');
  }
};
