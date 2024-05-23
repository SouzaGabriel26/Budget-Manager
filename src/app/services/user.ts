import axios from 'axios';

import { User } from '../types/user';
import { constants } from '../utils/constants';

async function getInfo(accessToken: string) {
  const { data: userInfo } = await axios.get<User>(
    constants.google_user_info_url,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return userInfo;
}

export const userService = Object.freeze({
  getInfo,
});
