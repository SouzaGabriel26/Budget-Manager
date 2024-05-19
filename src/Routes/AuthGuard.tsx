import { Navigate, Outlet } from 'react-router-dom';

type AuthGuardProps = {
  isPrivate: boolean;
};

export default function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (isPrivate && !signedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isPrivate && signedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
