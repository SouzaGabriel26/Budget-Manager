import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../app/hooks/useAuthContext';
import { google } from '../../app/models/google';
import { user } from '../../app/models/user';

export function CallbackGoogle() {
  const { saveUserInfo } = useAuthContext();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  useEffect(() => {
    async function getUserInfo() {
      const code = params.get('code');
      if (!code) return;

      const accessToken = await google.getAccessToken(code);
      const userInfo = await user.getInfo(accessToken);

      saveUserInfo({
        user: userInfo,
        accessToken,
      });
    }

    getUserInfo();
  }, [params, saveUserInfo]);

  useEffect(() => {
    const error = params.get('error');
    if (error === 'access_denied') {
      navigate('/');
    }
  }, [navigate, params]);

  return (
    <main className="grid place-items-center h-full">
      <h1 className="animate-pulse text-2xl">Loading...</h1>
    </main>
  );
}
