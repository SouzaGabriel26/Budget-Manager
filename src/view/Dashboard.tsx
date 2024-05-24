import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { useAuthContext } from '../app/hooks/useAuthContext';
import { userService } from '../app/services/user';
import { constants } from '../app/utils/constants';

import { Sidebar } from './components/Sidebar';

export function Dashboard() {
  const { saveUserInfo, userInfo, signOut } = useAuthContext();

  useEffect(() => {
    async function handleUserInfo() {
      const accessToken = localStorage.getItem(constants.access_token_key);

      if (userInfo && !userInfo.verified_email) {
        signOut();
      }

      if (accessToken && !userInfo) {
        try {
          const { userInfo: returnedUser } =
            await userService.getInfo(accessToken);
          saveUserInfo({
            user: returnedUser,
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

  if (!userInfo) {
    return null;
  }

  return (
    <div className="h-full">
      <Sidebar />
    </div>
  );
}
