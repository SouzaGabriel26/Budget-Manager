import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { useAuthContext } from '../app/hooks/useAuthContext';
import { user } from '../app/models/user';
import { constants } from '../app/utils/constants';

export function Dashboard() {
  const { saveUserInfo, userInfo, signOut } = useAuthContext();

  useEffect(() => {
    async function handleUserInfo() {
      const accessToken = localStorage.getItem(constants.access_token_key);

      if (accessToken && !userInfo) {
        try {
          const returnedUserInfo = await user.getInfo(accessToken);
          saveUserInfo({
            user: returnedUserInfo,
            accessToken,
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              signOut();
            }
          }
        }
      }
    }

    handleUserInfo();
  }, [saveUserInfo, userInfo, signOut]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{userInfo?.name}</p>
      <img src={userInfo?.picture} alt={userInfo?.name} />
    </div>
  );
}
