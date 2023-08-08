import type { PullRequestEvent } from '$lib/server/github';
import type { ItemCollection } from '$lib/server/mongo/operations';
import clientPromise from '$lib/server/mongo';
import config from '$lib/server/config';
import { collections, updateCollectionInfo } from '$lib/server/mongo/operations';

const storeClosedPRToDB = async (prInfo: ItemCollection) => {
  const mongoDB = await clientPromise;

  const res = await updateCollectionInfo(
    mongoDB.db(config.mongoDBName),
    collections.items,
    { id: prInfo.id },
    { $set: prInfo },
    { upsert: true }
  );

  return res;
};

const parsePullRequestEvents = async (event: PullRequestEvent) => {
  const { action, pull_request, repository, organization, sender } = event;

  switch (action) {
    case 'closed': {
      const requestInfo: ItemCollection = {
        type: 'pull_request',
        id: pull_request.id,
        org: organization?.login || 'holdex',
        repo: repository.name,
        owner: pull_request.user.login || sender.login,
        url: pull_request.url,
        createdAt: pull_request.created_at,
        updatedAt: pull_request.updated_at,
        closedAt: pull_request.closed_at
      };

      const res = await storeClosedPRToDB(requestInfo);
      console.log('Closed PR has been stored in DB successfully.', res);

      break;
    }

    default: {
      console.log('current action for pull request is not in the parse candidate', event);

      break;
    }
  }
};

export default parsePullRequestEvents;
