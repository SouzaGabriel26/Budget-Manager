import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../app/hooks/useAuthContext';
import { googleService } from '../app/services/google';
import { userService } from '../app/services/user';
import { constants } from '../app/utils/constants';

export function Dashboard() {
  const { saveUserInfo, userInfo, signOut } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleCreateSpreadsheet() {
    setIsLoading(true);
    try {
      const { spreadSheet } = await googleService.createSpreadsheet();
      console.log(spreadSheet);
    } catch {
      // handle error
    } finally {
      setIsLoading(false);
    }
  }
  if (!userInfo) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.name}</h1>
      <button
        className="bg-slate-300 rounded"
        type="button"
        disabled={isLoading}
        onClick={handleCreateSpreadsheet}
      >
        Create SpreadSheet
      </button>
    </div>
  );
}
