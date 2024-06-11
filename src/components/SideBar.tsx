import React from 'react';
import Menu from './Menu';
import logo from '../assets/veterinario.svg';

const Sidebar: React.FC = () => {
  const menus = [
    {
      label: 'Users',
      subMenus: [
        { label: 'New User', link: '#' },
        { label: 'List Users Active', link: '#' },
        { label: 'List Users Inactive', link: '#' },
      ],
    },
    {
      label: 'Products',
      subMenus: [
        { label: 'New Product', link: '#' },
        { label: 'List Products', link: '#' },
      ],
    },
    {
      label: 'Services',
      subMenus: [
        { label: 'New Service', link: '#' },
        { label: 'List Service', link: '#' },
      ],
    },
  ];

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="flex items-center justify-center p-4">
        <img src={logo} alt="Logo" className="h-12" /> 
      </div>
      <nav className="flex flex-col p-4">
        {menus.map((menu, index) => (
          <Menu key={index} label={menu.label} subMenus={menu.subMenus} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;