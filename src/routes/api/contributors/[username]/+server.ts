import { json } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { RequestHandler } from '@sveltejs/kit';

import clientPromise from '$lib/server/mongo';
import config from '$lib/server/config';
import { Collections, type ContributorCollection } from '$lib/server/mongo/operations';
import { ItemState, ItemType } from '$lib/constants';

export const GET: RequestHandler = async ({ params, fetch }) => {
  try {
    const mongoClient = await clientPromise;
    const collection = mongoClient
      .db(config.mongoDBName)
      .collection<ContributorCollection>(Collections.CONTRIBUTORS);
    const contributor = await collection.findOne({ login: params.username });

    if (!contributor) throw Error(`Contributor, "${params.username}", not found.`);

    const prsResponse = await fetch(
      `/api/items?type=${ItemType.PULL_REQUEST}&owner=${contributor.login}&state=${ItemState.PENDING}`
    );

    return json(
      { message: 'success', result: { ...contributor, prs: (await prsResponse.json()).result } },
      { status: StatusCode.SuccessOK }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return json(
      { message: e.message || e, result: null, error: true },
      { status: StatusCode.ClientErrorNotFound }
    );
  }
};
