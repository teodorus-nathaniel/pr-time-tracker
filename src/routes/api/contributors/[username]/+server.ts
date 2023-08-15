import { json } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { RequestHandler } from '@sveltejs/kit';

import clientPromise from '$lib/server/mongo';
import config from '$lib/server/config';
import { Collections, type ContributorCollection } from '$lib/server/mongo/operations';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const mongoClient = await clientPromise;
    const collection = mongoClient
      .db(config.mongoDBName)
      .collection<ContributorCollection>(Collections.CONTRIBUTORS);
    const contributor = await collection.findOne({ login: params.username });

    if (!contributor) throw Error(`Contributor, "${params.username}", not found.`);

    return json({ message: 'success', result: contributor }, { status: StatusCode.SuccessOK });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return json(
      { message: e.message || e, result: null, error: true },
      { status: StatusCode.ClientErrorNotFound }
    );
  }
};
