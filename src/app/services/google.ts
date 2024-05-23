import axios from 'axios';

import { constants } from '../utils/constants';

async function getAccessToken(queryString: string) {
  const {
    data: { access_token: accessToken },
  } = await axios.post<Record<string, string>>(
    constants.google_get_token_url,
    queryString,
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
