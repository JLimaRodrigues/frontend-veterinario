import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SubMenu from '@/components/SubMenu';

interface MenuProps {
  label: string;
  icon: IconDefinition;
  subMenus: { label: string; link: string }[];
}

const Menu: React.FC<MenuProps> = ({ label, icon, subMenus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={toggleMenu}
      >
        <div className="flex items-center">
          <FontAwesomeIcon icon={icon} className="mr-2" />
          <span>{label}</span>
        </div>
        <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
      </div>
      {isOpen && (
        <div className="ml-4 mt-2">
          {subMenus.map((subMenu, index) => (
            <SubMenu key={index} label={subMenu.label} link={subMenu.link} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
