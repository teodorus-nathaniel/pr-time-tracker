import { json } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { RequestHandler } from '@sveltejs/kit';

import clientPromise from '$lib/server/mongo';
import config from '$lib/server/config';
import { collections, getDocumentsInfo } from '$lib/server/mongo/operations';
import { ItemType } from '$lib/constants/constants';

export const GET: RequestHandler = async () => {
  const mongoDB = await clientPromise;

  const documents = await (
    await getDocumentsInfo(mongoDB.db(config.mongoDBName), collections.items, {
      type: ItemType.PULL_REQUEST,
      reject: { $exists: true }
    })
  ).toArray();

  return json({ message: 'success', result: documents }, { status: StatusCode.SuccessOK });
};
