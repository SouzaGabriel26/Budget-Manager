import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CallbackGoogle } from '../view/Auth/CallbackGoogle';
import { Dashboard } from '../view/Dashboard';
import Home from '../view/Home';

import AuthGuard from './AuthGuard';
import { DashboardLayout } from './DashboardLayout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/google/signin" element={<p>signin</p>} />
          <Route path="/" element={<Home />} />
          <Route path="/auth/callback/google" element={<CallbackGoogle />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}
