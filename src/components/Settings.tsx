import { useState } from 'react';
import Modal from './Modal';
import ThemeSwitcher from './ThemeSwitcher';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('layout');

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="p-2 bg-gray-300 dark:bg-gray-700 rounded">Settings</button>
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
    </div>
  );
}

export default Settings;
