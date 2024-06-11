import React, { useState } from 'react';
import Modal from './Modal';
import ThemeSwitcher from './ThemeSwitcher';

interface SettingsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState('layout');

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex">
          <ul className="w-1/4 p-4 border-r border-gray-300 dark:border-gray-600">
            <li 
              className={`p-2 cursor-pointer ${activeMenu === 'layout' ? 'bg-gray-200 dark:bg-gray-700' : ''}`} 
              onClick={() => setActiveMenu('layout')}
            >
              Layout
            </li>
            {/* Adicione mais itens de menu conforme necessário */}
          </ul>
          <div className="w-3/4 p-4">
            {activeMenu === 'layout' && (
              <div>
                <h2 className="text-xl mb-4">Layout Settings</h2>
                <div>
                  <label className="block text-sm mb-2">Theme</label>
                  <ThemeSwitcher />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Settings;
