import { ReactNode, createContext, useState } from 'react';

import { google } from '../model/google';

type UserInfo = {
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  id: string;
  locale: string;
  verified_email: boolean;
};

type SaveUserInfoType = {
  user: UserInfo;
  accessToken: string;
};

type AuthContextType = {
  signedIn: boolean;
  signInGoogle(): void;
  signOut(): void;
  saveUserInfo(input: SaveUserInfoType): void;
  userInfo: UserInfo;
};

export const AuthContext = createContext({} as AuthContextType);
const accessTokenKey = 'budget-manager:access_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(
    () => !!localStorage.getItem(accessTokenKey),
  );
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  // TODO: when user is signed (accessToken in localstorage)
  // and userInfo is empty, fetch user info from the google API

  function signInGoogle() {
    const oauth2Endpoint = google.getAuthEndpoint();
    window.location.href = oauth2Endpoint;
  }

  function signOut() {
    setSignedIn(false);
    localStorage.removeItem(accessTokenKey);
  }

  async function saveUserInfo({ accessToken, user }: SaveUserInfoType) {
    setUserInfo(user);

    localStorage.setItem(accessTokenKey, accessToken);

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
