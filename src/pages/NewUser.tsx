import React, { useState } from 'react';
import TopBar from '@/components/Bar/TopBar';
import SideBar from '@/components/Bar/SideBar';
import FormNewUser from '@/components/Contents/FormNewUser';

const NewUser: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <SideBar />}
      <div className="flex flex-col flex-1">
        <TopBar toggleSidebar={toggleSidebar} />
        <FormNewUser />
      </div>
    </div>
  );
  }
  
  export default NewUser