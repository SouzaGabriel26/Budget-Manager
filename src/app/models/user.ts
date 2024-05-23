import { userService } from '../services/user';

async function getInfo(accessToken: string) {
  const userInfo = await userService.getInfo(accessToken);

  return userInfo;
}

export const user = Object.freeze({
  getInfo,
});
