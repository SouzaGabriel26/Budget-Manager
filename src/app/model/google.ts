import { env } from '../config/env';
import { queryString } from '../utils/queryString';

function getAuthEndpoint() {
  const options = queryString({
    client_id: env.google_client_id,
    redirect_uri: 'http://localhost:5173/auth/callback/google',
    response_type: 'code',
    scope: 'email%20profile',
  });

  const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth?${options}`;

  return oauth2Endpoint;
}

export const google = Object.freeze({
  getAuthEndpoint,
});

// TODO: abstract logic to get accessToken and userInfo.
// Actually its implemented in `CallbackGoogle.tsx`
