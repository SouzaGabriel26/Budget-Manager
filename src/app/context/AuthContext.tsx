import { ReactNode, createContext, useState } from 'react';

import { env } from '../config/env';
import { User } from '../types/user';
import { constants } from '../utils/constants';
import { queryString } from '../utils/queryString';

type SaveUserInfoType = {
  user: User;
  accessToken: string;
};

type AuthContextType = {
  signedIn: boolean;
  signInGoogle(): void;
  signOut(): void;
  saveUserInfo(input: SaveUserInfoType): void;
  userInfo: User;
};

export const AuthContext = createContext({} as AuthContextType);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(
    () => !!localStorage.getItem(constants.access_token_key),
  );
  const [userInfo, setUserInfo] = useState({} as User);
  // TODO: when user is signed (accessToken in localstorage)
  // and userInfo is empty, fetch user info from the google API

  function signInGoogle() {
    const queryStringOptions = queryString({
      client_id: env.google_client_id,
      redirect_uri: constants.redirect_uri,
      response_type: 'code',
      scope: 'email%20profile',
    });

    const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth?${queryStringOptions}`;

    window.location.href = oauth2Endpoint;
  }

  function signOut() {
    setSignedIn(false);
    localStorage.removeItem(constants.access_token_key);
    // TODO: signout google
  }

  async function saveUserInfo({ accessToken, user }: SaveUserInfoType) {
    setUserInfo(user);

    localStorage.setItem(constants.access_token_key, accessToken);

    setSignedIn(true);
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        signInGoogle,
        signOut,
        saveUserInfo,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
