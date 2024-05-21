import { ReactNode, createContext, useState } from 'react';

import { env } from '../config/env';

type AuthContextType = {
  signedIn: boolean;
  signIn(): void;
  signOut(): void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);

  function getUrl() {
    const options = {
      client_id: env.google_client_id,
      redirect_uri: 'http://localhost:5173/auth/callback/google',
      response_type: 'code',
      scope: 'email%20profile',
    };

    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth?';
    Object.entries(options).forEach(([key, value]) => {
      oauth2Endpoint += `${key}=${value}&`;
    });

    if (oauth2Endpoint.endsWith('&')) {
      oauth2Endpoint = oauth2Endpoint.slice(0, -1);
    }

    window.location.href = oauth2Endpoint;
  }

  function signIn() {
    getUrl();
    // setSignedIn(true);
  }

  function signOut() {
    setSignedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
