import React from 'react';
import { useAuth } from '../context/AuthContext';
import Settings from './Settings';

const Topbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-16 bg-gray-700 text-white flex justify-between items-center px-4">
      <div className="text-xl">Admin Dashboard</div>
      <div className="flex items-center space-x-4">
        <Settings />
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
};

export default Topbar;
