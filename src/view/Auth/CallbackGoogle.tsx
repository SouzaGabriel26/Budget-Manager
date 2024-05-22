import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { env } from '../../app/config/env';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { queryString } from '../../app/utils/queryString';

export function CallbackGoogle() {
  const { saveUserInfo } = useAuthContext();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserInfo() {
      const code = params.get('code');

      if (!code) return;

      const options = queryString({
        client_id: env.google_client_id,
        client_secret: env.google_client_secret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:5173/auth/callback/google',
      });

      const {
        data: { access_token: accessToken },
      } = await axios.post('https://oauth2.googleapis.com/token', options, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { data: userInfo } = await axios.get(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

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
