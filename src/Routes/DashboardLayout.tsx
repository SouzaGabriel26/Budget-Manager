import { Outlet } from 'react-router-dom';

import { Sidebar } from '../view/components/Sidebar';

export function DashboardLayout() {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="w-full rounded-lg bg-white shadow-2xl m-2">
        <Outlet />
      </div>
    </div>
  );
}
