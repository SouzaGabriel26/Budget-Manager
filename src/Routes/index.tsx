import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../view/Home';

import AuthGuard from './AuthGuard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/google/signin" element={<p>signin</p>} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/dashboard" element={<p>Dashboard</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
