import { error, json } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { RequestHandler } from '@sveltejs/kit';

import clientPromise from '$lib/server/mongo';
import config from '$lib/server/config';
import { collections, getDocumentsInfo, updateCollectionInfo } from '$lib/server/mongo/operations';
import { ItemType } from '$lib/constants/constants';

export const GET: RequestHandler = async () => {
  const mongoDB = await clientPromise;

  const documents = await (
    await getDocumentsInfo(mongoDB.db(config.mongoDBName), collections.items, {
      type: ItemType.PULL_REQUEST,
      approval: { $exists: false }
    })
  ).toArray();

  return json({ message: 'success', result: documents }, { status: StatusCode.SuccessOK });
};

export const POST: RequestHandler = async ({ request }) => {
  const { id, approval } = await request.json();

  if (id === undefined || approval === undefined) {
    throw error(StatusCode.ClientErrorBadRequest, 'id_or_approval_missing');
  }

  const mongoDB = await clientPromise;
  const res = await updateCollectionInfo(
    mongoDB.db(config.mongoDBName),
    collections.items,
    { id: id },
    { $set: { approval } }
  );

  return json({ message: 'success', result: res }, { status: StatusCode.SuccessOK });
};

export const PUT: RequestHandler = async ({ request }) => {
  const { id, reject } = await request.json();

  if (id === undefined || reject === undefined) {
    throw error(StatusCode.ClientErrorBadRequest, 'id_or_approval_missing');
  }

  const mongoDB = await clientPromise;
  const res = await updateCollectionInfo(
    mongoDB.db(config.mongoDBName),
    collections.items,
    { id: id },
    { $set: { reject } }
  );

  return json({ message: 'success', result: res }, { status: StatusCode.SuccessOK });
};
