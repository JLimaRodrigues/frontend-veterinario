import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <nav className="flex flex-col p-4">
        <a href="#" className="mb-4">Dashboard</a>
        <a href="#" className="mb-4">Users</a>
        <a href="#" className="mb-4">Settings</a>
      </nav>
    </div>
  );
};

export default Sidebar;