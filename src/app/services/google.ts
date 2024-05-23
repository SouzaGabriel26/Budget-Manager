import axios from 'axios';

import { env } from '../config/env';
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

  const {
    data: { access_token: accessToken },
  } = await axios.post<Record<string, string>>(
    constants.google_get_token_url,
    queryStringOptions,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return { accessToken };
}

export const googleService = Object.freeze({
  getAccessToken,
});
