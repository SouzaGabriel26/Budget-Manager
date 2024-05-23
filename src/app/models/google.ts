import { env } from '../config/env';
import { googleService } from '../services/google';
import { GoogleGetTokenOptions } from '../types/googleOptions';
import { constants } from '../utils/constants';
import { queryString } from '../utils/queryString';

async function getAccessToken(code: string) {
  const getTokenOptions: GoogleGetTokenOptions = {
    client_id: env.google_client_id,
    client_secret: env.google_client_secret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: constants.redirect_uri,
  };

  const queryStringOptions = queryString(getTokenOptions);

  const { accessToken } =
    await googleService.getAccessToken(queryStringOptions);

  return accessToken;
}

export const google = Object.freeze({
  getAccessToken,
});
