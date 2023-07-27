import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { names, serializeCookie } from '$lib/CookieManager';
import app from '$lib/server/github';

export const GET: RequestHandler = async ({ cookies }) => {
    const accessToken = cookies.get(names.accessTokenCookieName);
    if (accessToken) {
        await app.oauth.deleteToken({ token: accessToken })
    }
    cookies.delete(names.accessTokenCookieName, serializeCookie({
        expires: new Date(0)
    }))
    cookies.delete(names.refreshTokenCookieName, serializeCookie({
        expires: new Date(0)
    }))
    return json({}, { status: 200 })
}