import { error, json } from '@sveltejs/kit';
import StatusCode from 'status-code-enum';

import type { RequestHandler } from '@sveltejs/kit';

import clientPromise from '$lib/server/mongo';
import config from '$lib/server/config';
import type { ItemCollection } from '$lib/server/mongo/operations';
import { collections, getDocumentsInfo, updateCollectionInfo } from '$lib/server/mongo/operations';
import { ItemType, ItemState } from '$lib/constants/constants';

export const GET: RequestHandler = async ({ url }) => {
  const { searchParams } = url;

  const requestType = searchParams.get('type') ?? ItemType.PULL_REQUEST;
  const requestedState = searchParams.get('state') ?? ItemState.PENDING;

  const mongoDB = await clientPromise;
  const filter =
    requestedState === ItemState.PENDING
      ? {
          type: requestType,
          [ItemState.APPROVED]: { $exists: false },
          [ItemState.REJECTED]: { $exists: false }
        }
      : {
          type: requestType,
          [requestedState]: { $exists: true }
        };

  const documents = await (
    await getDocumentsInfo(mongoDB.db(config.mongoDBName), collections.items, filter)
  ).toArray();

  return json({ message: 'success', result: documents }, { status: StatusCode.SuccessOK });
};

export const POST: RequestHandler = async ({ request }) => {
  const requestBody: ItemCollection = await request.json();

  if (requestBody.id === undefined) {
    throw error(StatusCode.ClientErrorBadRequest, 'id_is_missing');
  }

  const mongoDB = await clientPromise;
  const res = await updateCollectionInfo(
    mongoDB.db(config.mongoDBName),
    collections.items,
    { id: requestBody.id },
    { $set: { ...requestBody } }
  );

  return json({ message: 'success', result: res }, { status: StatusCode.SuccessOK });
};
