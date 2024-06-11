import React from 'react';

interface SubMenuProps {
  label: string;
  link: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ label, link }) => {
  return (
    <a href={link} className="block mb-2">
      {label}
    </a>
  );
};

export default SubMenu;
