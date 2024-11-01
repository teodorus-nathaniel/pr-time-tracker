import type { TriggerContext, IOWithIntegrations } from '@trigger.dev/sdk';
import type { Autoinvoicing } from '@holdex/autoinvoicing';
import type { IssueCommentEvent } from '@octokit/webhooks-types';

import {
  getPreviousComment,
  deleteComment,
  createComment,
  getInstallationId,
  submissionHeaderCommentForPR,
  getPullRequestByIssue,
  excludedAccounts
} from '../utils';

export async function createJob<T extends IOWithIntegrations<{ github: Autoinvoicing }>>(
  payload: IssueCommentEvent,
  io: T,
  ctx: TriggerContext,
  org: { nodeId: string; name: string }
) {
  const { action, organization, repository, issue } = payload;
  const orgName = organization?.login || 'holdex';

  const isPullRequest = issue.html_url.includes('/pull/');
  if (!isPullRequest) {
    io.logger.log('comment creation in issue is not in the parse candidate', payload);
    return;
  }

  const orgDetails = await io.runTask(
    'get-org-installation',
    async () => {
      const { data } = await getInstallationId(orgName);
      return data;
    },
    { name: 'Get Organization installation' }
  );

  switch (action) {
    case 'created': {
      if (excludedAccounts.includes(payload.sender.login)) {
        io.logger.log('current sender for issue comment is excluded', payload);
        break;
      }

      const previousComment = await io.runTask('delete-previous-pr-comment', async () => {
        const pr = await getPullRequestByIssue(issue, orgDetails.id, org.name, repository.name, io);
        if (!pr) {
          return;
        }

        const previousComment = await getPreviousComment(
          orgDetails.id,
          orgName,
          repository.name,
          submissionHeaderCommentForPR(pr.id),
          pr.number,
          'pullRequest',
          io
        );

        if (previousComment) {
          await deleteComment(orgDetails.id, orgName, repository.name, previousComment, io);
        }

        return previousComment;
      });

      if (previousComment) {
        await io.runTask('reinsert-pr-comment', async () => {
          await createComment(
            orgDetails.id,
            orgName,
            repository.name,
            previousComment.body,
            issue.number,
            io
          );
        });
      }

      break;
    }
    default: {
      io.logger.log('current action for issue comment is not in the parse candidate', payload);
    }
  }
}
