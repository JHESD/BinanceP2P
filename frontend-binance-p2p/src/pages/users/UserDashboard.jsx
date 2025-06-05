import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNav from '../../components/shared/UserNavbar';

const UserDashboard = () => {
  return (
    <div className="flex">
      <UserNav />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
