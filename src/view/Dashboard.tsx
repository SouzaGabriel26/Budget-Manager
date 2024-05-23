import { useEffect } from 'react';

import { useAuthContext } from '../app/hooks/useAuthContext';
import { user } from '../app/models/user';
import { constants } from '../app/utils/constants';

export function Dashboard() {
  const { saveUserInfo, userInfo } = useAuthContext();

  useEffect(() => {
    async function handleUserInfo() {
      const accessToken = localStorage.getItem(constants.access_token_key);

      if (accessToken && !userInfo) {
        const returnedUserInfo = await user.getInfo(accessToken);
        saveUserInfo({
          user: returnedUserInfo,
          accessToken,
        });
      }
    }

    handleUserInfo();
  }, [saveUserInfo, userInfo]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{userInfo?.name}</p>
      <img src={userInfo?.picture} alt={userInfo?.name} />
    </div>
  );
}
