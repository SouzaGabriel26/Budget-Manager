import { ReactNode, createContext, useState } from 'react';

type AuthContextType = {
  signedIn: boolean;
  signIn(): void;
  signOut(): void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);

  function signIn() {
    setSignedIn(true);
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
