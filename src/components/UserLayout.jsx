import React from 'react';
import UserMenu from './UserMenu'

const UserLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <UserMenu />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
