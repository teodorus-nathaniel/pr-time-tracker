import type { CookieSerializeOptions } from 'cookie';

import { isDev } from '$lib/config';

export const cookieNames = {
  contributorId: 'invoicingContributorId',
  contributorRole: 'invoicingContributorRole',
  accessTokenCookieName: 'invoicingAccessToken',
  refreshTokenCookieName: 'invoicingRefreshToken'
};

export function serializeCookie(options?: CookieSerializeOptions): CookieSerializeOptions {
  return {
    ...options,
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: !isDev
  };
}
