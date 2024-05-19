import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../app/hooks/useAuthContext';

type AuthGuardProps = {
  isPrivate: boolean;
};

export default function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuthContext();

  if (isPrivate && !signedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isPrivate && signedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
