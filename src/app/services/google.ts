import axios from 'axios';

import { env } from '../config/env';
import { GoogleGetTokenOptions } from '../types/googleOptions';
import { constants } from '../utils/constants';

async function getAccessToken(code: string) {
  const getTokenOptions: GoogleGetTokenOptions = {
    client_id: env.google_client_id,
    client_secret: env.google_client_secret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: constants.redirect_uri,
  };

  const queryStringOptions = new URLSearchParams(getTokenOptions).toString();

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

async function createSpreadsheet() {
  // verify if the user has already created a spreadsheet called Budget Manager
  const { data } = await axios.post(
    constants.google_create_spreadsheet_url,
    {
      properties: {
        title: 'Budget Manager',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          constants.access_token_key,
        )}`,
      },
    },
  );

  return { spreadSheet: data };
}

export const googleService = Object.freeze({
  getAccessToken,
  createSpreadsheet,
});
