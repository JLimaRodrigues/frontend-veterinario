import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Settings from '@/components/Settings';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl flex-1 text-center">
        {user ? `Hello, ${user}` : <Link to="/">Home</Link>}
      </div>
      <div className="flex items-center space-x-4">  
        <Settings isOpen={isSettingsOpen}  setIsOpen={setIsSettingsOpen} />
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
