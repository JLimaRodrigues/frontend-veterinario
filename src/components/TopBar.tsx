import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Settings from './Settings';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-16 bg-gray-700 text-white flex justify-between items-center px-4">
      <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} className="cursor-pointer" />
      <div className="relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          Options
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
            </Link>
            <button 
              onClick={() => setIsSettingsOpen(true)}  
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
              <FontAwesomeIcon icon={faCog} className="mr-2" /> Preferences
            </button>
            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
      <Settings 
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}  
      />
    </div>
  );
};

export default Topbar;
