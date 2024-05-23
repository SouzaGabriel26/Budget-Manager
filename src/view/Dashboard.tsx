import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { useAuthContext } from '../app/hooks/useAuthContext';
import { userService } from '../app/services/user';
import { constants } from '../app/utils/constants';

export function Dashboard() {
  const { saveUserInfo, userInfo, signOut } = useAuthContext();

  useEffect(() => {
    async function handleUserInfo() {
      const accessToken = localStorage.getItem(constants.access_token_key);

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

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{userInfo?.name}</p>
      <img src={userInfo?.picture} alt={userInfo?.name} className="mb-10" />

      <button
        type="button"
        onClick={signOut}
        className="px-4 py-2 rounded bg-white hover:bg-white/35 transition"
      >
        Signout
      </button>
    </div>
  );
}
